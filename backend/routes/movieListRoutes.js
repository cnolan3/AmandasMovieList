const express = require('express');

const movieListController = require('../controllers/movieListController');
const authController = require('../controllers/authController');

const router = express.Router();

// public routes
router.get('/', movieListController.getWatchlist);
router.get('/seen', movieListController.getSeenList);

// protected routes
router.use(authController.protect);

router.post(
  '/recommendmovie/:imdbID',
  authController.restrictTo('user', 'admin'),
  movieListController.recommendMovie,
  movieListController.addToWatchlist,
);

// protected and restricted to amanda routes
router.use(authController.restrictTo('amanda'));

router.patch('/unwatch/:imdbID', movieListController.unwatch);

router.patch('/ratemovie/:imdbID', movieListController.rateMovie);

router
  .route('/:imdbID')
  .post(movieListController.addToWatchlist)
  .delete(movieListController.deleteMovie);

module.exports = router;
