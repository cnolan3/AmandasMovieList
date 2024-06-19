const express = require('express');
const signupKeyController = require('../controllers/signupKeyController');

const router = express.Router();

router.get('/create', signupKeyController.createKey);

module.exports = router;
