const crypto = require('crypto');
const { promisify } = require('util');

const SignupKey = require('../models/signupKeyModel');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

// create a key and store it in the db
exports.createKey = catchAsync(async (req, res, next) => {
  // get requesting users username from jwt
  const { username } = req.user;

  // generate key
  const key = (await promisify(crypto.randomBytes)(12)).toString('hex');

  await SignupKey.create({
    createdBy: username,
    key,
  });

  logger.verbose('signup key created');

  res.status(200).json({
    status: 'success',
    data: {
      signupKey: key,
      createdBy: username,
    },
  });
});
