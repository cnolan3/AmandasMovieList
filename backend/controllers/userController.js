const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const logger = require('../utils/logger');

const addPriviledgedInfo = (req, query) => {
  if (req.priviledged)
    query.select({ email: 1, role: 1, passwordChangedAt: 1 });
  return query;
};

// get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = addPriviledgedInfo(req, User.find());
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort('+username')
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const user = await addPriviledgedInfo(req, User.findById(req.params.id));

  if (!user) {
    return next(new AppError('No user found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// search for a username
exports.searchUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const usersQuery = User.find({
    username: { $regex: `^${username}`, $options: 'i' },
  });
  const users = await addPriviledgedInfo(req, usersQuery);

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

// get my own user info
exports.myInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select({
    email: 1,
    role: 1,
    passwordChangedAt: 1,
    username: 1,
  });

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  logger.info(`User id: ${user._id} (${user.username}) deleted`);

  res.status(204).send();
});
