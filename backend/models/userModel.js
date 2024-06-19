const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
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
    trim: true,
    validate: [validator.isEmail, 'User email must be in a valid format.'],
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
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
});

// encrypt the password when saved to the db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

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

module.exports = mongoose.model('User', userSchema);
