const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { promisify } = require('util');

const logger = require('../utils/logger');

const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema({
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
    select: false,
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
});

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

module.exports = mongoose.model('User', userSchema);
