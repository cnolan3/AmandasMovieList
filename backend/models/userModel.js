const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { promisify } = require('util');

const logger = require('../utils/logger');
const MovieList = require('./movieListModel');
const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Users must have a username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Users must have an email'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'User email must be in a valid format.'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'amanda', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Users must have a password'],
      minlength: 8,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    votedFor: {
      type: mongoose.Schema.ObjectId,
      ref: 'MovieList',
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// encrypt the password when saved to the db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// update the passwordChangedAt property when password is changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);

  next();
});

// populate the votedFor field
userSchema.pre(/^find/, function (next) {
  if (!this.votedFor) return next();
  this.populate({
    path: 'votedFor',
    select: 'title',
  });
  next();
});

// verify a given password
userSchema.methods.verifyPassword = async function (candidatePassword) {
  if (!this.password) {
    throw new AppError(
      'Password field does not exist on this User document',
      500,
    );
  }

  return await bcrypt.compare(candidatePassword, this.password);
};

// check if the password was changed after the given timestamp
// returns true if password has been changed since the given timestamp, false otherwise
userSchema.methods.wasPasswordChangedAfter = async function (timestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return timestamp < changedTimestamp;
  }

  return false;
};

// create a password reset token
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = (await promisify(crypto.randomBytes)(32)).toString('hex');

  logger.debug('generating reset token');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  logger.debug(`reset token created ${this.passwordResetToken}`);

  this.passwordResetExpires = Date.now() + 2 * 60 * 60 * 1000;

  return resetToken;
};

// update movie list with vote info
userSchema.statics.calcMovieVotes = async function (movieId) {
  // mongoose.Types.ObjectId.createFromHexString(movieId)
  const votes = await this.aggregate([
    {
      $match: {
        votedFor: movieId,
      },
    },
    {
      $group: {
        _id: '$votedFor',
        nVotes: { $sum: 1 },
      },
    },
  ]);

  logger.debug(JSON.stringify(votes));

  if (votes.length > 0) {
    await MovieList.findByIdAndUpdate(movieId, {
      numVotes: votes[0].nVotes,
    });
  } else {
    await MovieList.findByIdAndUpdate(movieId, {
      numVotes: 0,
    });
  }
};

// delete votes for a specific movie
userSchema.statics.deleteVotesFor = async function (movieId) {
  const users = await this.find({ votedFor: movieId });

  users.forEach(async (user) => {
    user.votedFor = undefined;
    await user.save();
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
