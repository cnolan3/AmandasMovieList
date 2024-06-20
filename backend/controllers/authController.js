const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const SignupKey = require('../models/signupKeyModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const sendEmail = require('../utils/email');

// create JWT
const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// build cookie options object
const getCookieOptions = () => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 86400000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  return cookieOptions;
};

// protect routes with jwt token login
exports.protect = catchAsync(async (req, res, next) => {
  // get token from auth headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in, please log in to access this resource',
        401,
      ),
    );

  // verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // get user from db
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('The user belonging to this token no longer exists', 401),
    );

  // grant access to route
  req.user = user;
  next();
});

// restrict access to routes to specific user roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    logger.debug(`restricted roles: ${roles}, given role: ${req.user.role}`);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to access this resource', 403),
      );
    }

    next();
  };

// signup user
exports.signup = catchAsync(async (req, res, next) => {
  const {
    username,
    email,
    password,
    passwordConfirm,
    signupKeyName,
    signupKey,
  } = req.body;

  // check that password matches password confirmation
  if (password !== passwordConfirm) {
    return next(
      new AppError('Password does not match password confirmation', 400),
    );
  }

  // get the signup key from the db
  const key = await SignupKey.findOne({ keyName: signupKeyName }).select(
    '+key',
  );

  // check that the key exists and verify
  if (!key || !(await key.verifyKey(signupKey))) {
    return next(new AppError('Invalid signup key', 400));
  }

  // create the new user
  const newUser = await User.create({
    username,
    email,
    password,
  });

  if (!newUser) {
    return next(new AppError('User creation failed', 500));
  }

  // delete the signup key
  await SignupKey.deleteOne({ _id: key._id });

  // sign the user in with a token
  const token = signToken(newUser._id);

  const cookieOptions = getCookieOptions();

  res.cookie('jwt', token, cookieOptions);

  logger.verbose('user signed up');

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser: {
        username: newUser.username,
        email: newUser.email,
      },
    },
  });
});

// log the user in
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide a username and password', 400));
  }

  // check for user and verify password
  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.verifyPassword(password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  // sign the uer in with a token
  const token = signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie('jwt', token, cookieOptions);

  logger.verbose('user logged in');

  res.status(200).json({
    status: 'success',
    token,
    data: null,
  });
});

// send forgot password email
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // get user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // generate reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  logger.verbose('password reset token created');

  // send token to the email
  const resetUrl = `https://amandasmovielist.com/forgotpassword/${resetToken}`;

  const message = `Forgot your password? Submit a password reset request with the given temporary password at: ${resetUrl}\n If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email,
      subject: 'AmandasMovieList pasword reset link (valid for 2 hours)',
      message,
    });

    logger.verbose(`reset email sent to ${email}`);

    res.status(200).json({
      status: 'success',
      message: 'Reset email sent',
    });
  } catch (err) {
    logger.error(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later',
        500,
      ),
    );
  }
});

// consume the password reset token to reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken, newPassword, newPasswordConfirm } = req.body;

  // get user from jwt
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // check if new password matches new password confirmation
  if (newPassword !== newPasswordConfirm)
    return next(
      new AppError('New password does not match password confirmation', 400),
    );

  // set new password if user exists and token has not expired
  if (!user) return next(new AppError('Token is invalid or has expired', 400));

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // log the user in with jwt
  const token = signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie('jwt', token, cookieOptions);

  logger.verbose('user logged in');

  res.status(200).json({
    status: 'success',
    token,
    data: null,
  });
});

// update password (was not forgotten)
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  // get the user from db
  let user = await User.findById(req.user._id).select('+password');

  if (!user)
    return next(new AppError('User has been deleted since logging in', 404));

  // check that new password matches new password confirmation
  if (newPassword !== newPasswordConfirm)
    return next(
      new AppError('New password does not match password confirmation', 400),
    );

  // verify given password (need to re-verify even if already logged in)
  if (!(await user.verifyPassword(currentPassword)))
    return next(
      new AppError('Current password is not corrent, please try again', 401),
    );

  // update password
  user.password = req.body.newPassword;
  user = await user.save();

  // sign the uer in with a token
  const token = signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie('jwt', token, cookieOptions);

  logger.verbose('user logged in');

  res.status(200).json({
    status: 'success',
    token,
    data: null,
  });
});
