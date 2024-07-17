const MovieList = require('../models/movieListModel');
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const APIFeatures = require('../utils/apiFeatures');
const OMDBGet = require('../utils/omdbGet');
const cache = require('../utils/nodeCache');

// add user info to add movie request middleware
exports.recommendMovie = catchAsync(async (req, res, next) => {
  req.body.recommendedById = req.user._id;

  next();
});

// add a movie to the watchlist
exports.addToWatchlist = catchAsync(async (req, res, next) => {
  const { imdbID } = req.params;

  let recommendedByName;
  let recommendedById;

  if (req.body.recommendedById) {
    let user = cache.getUser(req.body.recommendedById);

    if (!user) {
      user = await User.findById(req.body.recommendedById);
    }

    if (user) {
      recommendedById = req.body.recommendedById;
      cache.storeUser(user);
    }
  } else if (req.body.recommendedByName) {
    recommendedByName = req.body.recommendedByName;
  }

  // check for movie in cache
  let data = cache.getMovieById(imdbID);

  if (!data) {
    const omdb = new OMDBGet().imdbID(imdbID);
    data = await omdb.send();

    // store movie in cache
    cache.storeMovieById(data);
  }

  // check for a rotten tomatoes rating
  const rotten = data.Ratings.find(
    (element) => element.Source === 'Rotten Tomatoes',
  );

  // -1 represents a N/A rotten tomato rating
  let rottenPercent = -1;
  if (rotten) rottenPercent = parseFloat(rotten.Value);

  await MovieList.create({
    Title: data.Title,
    Year: data.Year,
    Runtime: data.Runtime,
    Genre: data.Genre,
    Plot: data.Plot,
    Actors: data.Actors,
    Director: data.Director,
    Poster: data.Poster,
    rottenTomatoRating: rottenPercent,
    imdbID: data.imdbID,
    recommendedByName,
    recommendedById,
  });

  // invalidate watchlist cache
  cache.invalidateWatchList();

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: data,
  });
});

// get watchlist
exports.getWatchlist = catchAsync(async (req, res, next) => {
  // check cache for watchlist
  let watchList = cache.getWatchList();

  if (!watchList) {
    const features = new APIFeatures(MovieList.find({ seen: false }), req.query)
      .sort('+numVotes')
      .limitFields()
      .paginate();
    watchList = await features.query.select('-amandaRating');

    // store watchlist in cache
    cache.storeWatchList(watchList);
  }

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      watchList,
    },
  });
});

// get seen list
exports.getSeenList = catchAsync(async (req, res, next) => {
  // check cache for seenlist
  let seenList = cache.getSeenList();

  if (!seenList) {
    const features = new APIFeatures(MovieList.find({ seen: true }), req.query)
      .sort('+amandaRating')
      .limitFields()
      .paginate();
    seenList = await features.query.select('-numVotes');

    // store seenlist in cache
    cache.storeSeenList(seenList);
  }

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      seenList,
    },
  });
});

// give a movie an amanda rating
exports.rateMovie = catchAsync(async (req, res, next) => {
  let updateData = { seen: true, votes: 0 };
  if (req.body.rating !== undefined)
    updateData = { ...updateData, amandaRating: req.body.rating };

  const movie = await MovieList.findOneAndUpdate(
    { imdbID: req.params.imdbID },
    updateData,
    { runValidators: true },
  );

  // invalidate caches
  cache.invalidateLists();

  await User.deleteVotesFor(movie._id);

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      movie: {
        id: movie._id,
        imdbID: movie.imdbID,
        Title: movie.Title,
      },
      rating: movie.amandaRating,
    },
  });
});

// move seen movie back to watchlist
exports.unwatch = catchAsync(async (req, res, next) => {
  const movie = await MovieList.findOneAndUpdate(
    { imdbID: req.params.imdbID },
    { seen: false, amandaRating: 0 },
    { runValidators: true },
  );

  // invalidate caches
  cache.invalidateLists();

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      movie: {
        id: movie._id,
        imdbID: movie.imdbID,
        Title: movie.Title,
      },
    },
  });
});

// remove movie from both lists
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { imdbID } = req.params;
  const movie = await MovieList.findOne({ imdbID });
  await User.deleteVotesFor(movie._id);
  await MovieList.findByIdAndDelete(movie._id);

  // invalidate caches
  if (movie.seen) cache.invalidateSeenList();
  else cache.invalidateWatchList();

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {},
  });
});
