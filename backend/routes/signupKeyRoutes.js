const express = require('express');

const signupKeyController = require('../controllers/signupKeyController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('amanda', 'admin'),
    signupKeyController.createKey,
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    signupKeyController.getKeys,
  );

module.exports = router;
