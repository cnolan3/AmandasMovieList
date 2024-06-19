const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SignupKey = require('../models/signupKeyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const logger = require('../utils/logger');

// create a key and store it in the db
exports.createKey = catchAsync(async (req, res, next) => {
  const username = 'testUser';

  // generate key
  const keyName = (await promisify(crypto.randomBytes)(4)).toString('hex');
  const key = (await promisify(crypto.randomBytes)(10)).toString('hex');

  await SignupKey.create({
    createdBy: username,
    key,
    keyName,
  });

  res.status(200).json({
    status: 'success',
    data: {
      signupKey: key,
      signupKeyName: keyName,
      createdBy: username,
    },
  });
});
