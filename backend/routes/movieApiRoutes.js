const express = require('express');

const movieApiController = require('../controllers/movieApiController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/:search', movieApiController.searchMovies);

router.get('/id/:imdbID', movieApiController.getMovieById);

router.get('/title/:title', movieApiController.getMovieByTitle);

module.exports = router;
