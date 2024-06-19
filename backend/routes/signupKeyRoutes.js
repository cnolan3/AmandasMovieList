const express = require('express');

const signupKeyController = require('../controllers/signupKeyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/create',
  authController.protect,
  authController.restrictTo('amanda', 'admin'),
  signupKeyController.createKey,
);

module.exports = router;
