const jwt = require('jsonwebtoken');
const SignupKey = require('../models/signupKeyModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const {
    username,
    email,
    password,
    passwordConfirm,
    signupKeyName,
    signupKey,
  } = req.body;

  if (password !== passwordConfirm) {
    return next(
      new AppError('Password does not match password confirmation', 400),
    );
  }

  const key = await SignupKey.findOne({ keyName: signupKeyName }).select(
    '+key',
  );

  if (!key || !(await key.verifyKey(signupKey))) {
    return next(new AppError('Invalid signup key', 400));
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  if (!newUser) {
    return next(new AppError('User creation failed', 500));
  }

  await SignupKey.deleteOne({ _id: key._id });

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
