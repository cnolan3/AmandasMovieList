const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const SignupKey = require('../models/signupKeyModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

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

  res.status(201).json({
    status: 'success',
    token,
    data: null,
  });
});
