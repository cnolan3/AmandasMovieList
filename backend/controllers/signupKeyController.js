const crypto = require('crypto');
const { promisify } = require('util');

const SignupKey = require('../models/signupKeyModel');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

// create a key and store it in the db
exports.createKey = catchAsync(async (req, res, next) => {
  // get requesting users username from jwt
  const { username, _id: userId } = req.user;

  // generate key
  const key = (await promisify(crypto.randomBytes)(12)).toString('hex');

  await SignupKey.create({
    createdBy: userId,
    key,
  });

  logger.verbose('signup key created');

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      signupKey: key,
      createdBy: {
        username,
        userId,
      },
    },
  });
});

// get info on all current keys
exports.getKeys = catchAsync(async (req, res, next) => {
  const keys = await SignupKey.find();

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      keys,
    },
  });
});
