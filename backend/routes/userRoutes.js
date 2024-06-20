const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword', authController.resetPassword);

router.patch(
  '/updatepassword',
  authController.protect,
  authController.updatePassword,
);

router.get('/myinfo', authController.protect, userController.myInfo);

router.get(
  '/search/:username',
  authController.redact,
  userController.searchUser,
);

router.route('/').get(authController.redact, userController.getAllUsers);

router
  .route('/:id')
  .get(authController.redact, userController.getAUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
