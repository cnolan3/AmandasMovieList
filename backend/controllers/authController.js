const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const SignupKey = require('../models/signupKeyModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const sendEmail = require('../utils/email');

const cookieName = 'AML_login_token';

// create JWT
const signToken = async (id) =>
  await promisify(jwt.sign)({ id: id }, process.env.JWT_SECRET, {
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

// extract jwt token from auth headers
// const getTokenFromHeaders = (headers) => {
//   let token;
//   if (headers.authorization && headers.authorization.startsWith('Bearer')) {
//     token = headers.authorization.split(' ')[1];
//   }
//   return token;
// };

// extract jwt token from cookies
const getTokenFromCookies = (cookies) => cookies[cookieName];

// verify user in db with a jwt
const verifyUserWithJWT = async (token, next) => {
  // verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // get user from db
  const user = await User.findById(decoded.id).select(
    '+passwordChangedAt +role',
  );
  if (!user)
    return next(
      new AppError('The user belonging to this token no longer exists', 401),
    );

  // check if user changed password after jwt was created
  if (await user.wasPasswordChangedAfter(decoded.iat))
    return next(
      new AppError(
        'User recently changed their password, please log in again',
        401,
      ),
    );

  return user;
};

// protect routes with jwt token login
exports.protect = catchAsync(async (req, res, next) => {
  // logger.debug('protect');
  // get token from auth headers
  logger.debug(`protect - ${JSON.stringify(req.cookies)}`);
  const token = getTokenFromCookies(req.cookies);

  logger.debug(JSON.stringify(req.cookies));

  if (!token)
    return next(
      new AppError('You do not have a token, please log in to obtain one', 401),
    );

  // verify token
  const user = await verifyUserWithJWT(token, next);

  // grant access to route
  req.user = user;
  next();
});

// mark admin users as priviledged to add extra info to responses
exports.redact = catchAsync(async (req, res, next) => {
  // get token from auth headers
  const token = getTokenFromCookies(req.cookies);

  // set priviledged to false initially
  req.priviledged = false;

  // if there is a token, verify it
  if (token) {
    const user = await verifyUserWithJWT(token, next);

    req.priviledged = user.role === 'admin';
  }

  next();
});

// restrict access to routes to specific user roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    const { role, _id, username } = req.user;
    if (!roles.includes(role)) {
      logger.info(
        `User id ${_id} (${username}) tried to access a restricted route (${roles})`,
      );
      return next(
        new AppError('You do not have permission to access this resource', 403),
      );
    }

    next();
  };

// signup user
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm, signupKey } = req.body;

  // check that password matches password confirmation
  if (password !== passwordConfirm) {
    return next(
      new AppError('Password does not match password confirmation', 400),
    );
  }

  // get the signup key from the db
  const hashedKey = crypto.createHash('sha256').update(signupKey).digest('hex');
  const key = await SignupKey.findOne({ key: hashedKey });

  // check that the key exists and verify
  if (!key) {
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
  const token = await signToken(newUser._id);

  const cookieOptions = getCookieOptions();

  res.cookie(cookieName, token, cookieOptions);
  res.header('Cache-Control', 'no-cache="Set-Cookie"');

  logger.verbose('user signed up');

  res.status(201).json({
    status: 'success',
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
  const user = await User.findOne({ username }).select(
    '+password +email +role',
  );

  if (!user || !(await user.verifyPassword(password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  // sign the uer in with a token
  const token = await signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie(cookieName, token, cookieOptions);
  res.header('Cache-Control', 'no-cache="Set-Cookie"');

  logger.verbose('user logged in');

  res.status(200).json({
    status: 'success',
    data: {
      username: user.username,
      role: user.role,
      email: user.email,
    },
  });
});

// log the user out (clear the login token cookie)
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie(cookieName);
  res.header('Cache-Control', 'no-cache="Set-Cookie"');

  logger.verbose('user logged out');

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// send forgot password email
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // get user by email
  const user = await User.findOne({ email }).select({
    passwordResetToken: 1,
    passwordResetExpires: 1,
  });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // generate reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  logger.verbose('password reset token created');

  // send token to the email
  const resetUrl = `https://amandasmovielist.com/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a password reset request by visiting this link: ${resetUrl}\n If you didn't forget your password, please ignore this email!`;

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
  }).select('+email +role');

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
  const token = await signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie(cookieName, token, cookieOptions);
  res.header('Cache-Control', 'no-cache="Set-Cookie"');

  logger.verbose('user logged in');

  res.status(200).json({
    status: 'success',
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// update password (was not forgotten)
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  // get the user from db
  let user = await User.findById(req.user._id).select('+password +email +role');

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
      new AppError('Current password is not correct, please try again', 401),
    );

  // update password
  user.password = req.body.newPassword;
  user = await user.save();

  // sign the uer in with a token
  const token = await signToken(user._id);

  const cookieOptions = getCookieOptions();

  res.cookie(cookieName, token, cookieOptions);
  res.header('Cache-Control', 'no-cache="Set-Cookie"');

  logger.verbose('user logged in');
  logger.debug(`update password for: ${JSON.stringify(user)} `);

  res.status(200).json({
    status: 'success',
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});
