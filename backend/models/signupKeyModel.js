const mongoose = require('mongoose');
const crypto = require('crypto');

const AppError = require('../utils/appError');

const expiresAfterDays = 7;

const signupKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Access key needs a key'],
    select: false,
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, 'Access key needs a created by username'],
    trim: true,
  },
  createdAt: {
    type: Date,
    expires: expiresAfterDays * 24 * 60 * 60 * 1000,
    // expires: 5000,
    default: Date.now(),
  },
});

// encrypt given key on save
signupKeySchema.pre('save', async function (next) {
  this.key = crypto.createHash('sha256').update(this.key).digest('hex');

  next();
});

// verify key
signupKeySchema.methods.verifyKey = async function (candidateKey) {
  if (!this.key) {
    throw new AppError(
      'Key field does not exist on this signupKey document',
      500,
    );
  }

  const hashedKey = crypto
    .createHash('sha256')
    .update(candidateKey)
    .digest('hex');
  return hashedKey === this.key;
};

module.exports = mongoose.model('SignupKey', signupKeySchema);
