const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AppError = require('../utils/appError');

const expiresAfterDays = 7;

const signupKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Access key needs a key'],
    select: false,
    trim: true,
  },
  keyName: {
    type: String,
    required: [true, 'Access key needs a name'],
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
  this.key = await bcrypt.hash(this.key, 12);

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

  return await bcrypt.compare(candidateKey, this.key);
};

module.exports = mongoose.model('SignupKey', signupKeySchema);
