const express = require('express');

const movieApiController = require('../controllers/movieApiController');

const router = express.Router();

router.get('/:search', movieApiController.searchMovies);

router.get('/id/:imdbID', movieApiController.getMovieById);

router.get('/title/:title', movieApiController.getMovieByTitle);

module.exports = router;
