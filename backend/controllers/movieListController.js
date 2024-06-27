const MovieList = require('../models/movieListModel');
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const logger = require('../utils/logger');
const APIFeatures = require('../utils/apiFeatures');
const OMDBGet = require('../utils/omdbGet');

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

  if (
    req.body.recommendedById &&
    (await User.findById(req.body.recommendedById))
  ) {
    recommendedById = req.body.recommendedById;
  } else if (req.body.recommendedByName) {
    recommendedByName = req.body.recommendedByName;
  }

  const omdb = new OMDBGet().omdbID(imdbID);
  const data = await omdb.send();

  const rottenPercent = parseFloat(data.Ratings[1].Value);

  await MovieList.create({
    title: data.Title,
    year: data.Year,
    runtime: data.Runtime,
    genre: data.Genre,
    plot: data.Plot,
    poster: data.Poster,
    rottenTomatoRating: rottenPercent,
    imdbID: data.imdbID,
    recommendedByName,
    recommendedById,
  });

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

// get watchlist
exports.getWatchlist = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(MovieList.find({ seen: false }), req.query)
    .sort('+numVotes')
    .limitFields()
    .paginate();
  const watchlist = await features.query.select('-amandaRating');

  res.status(200).json({
    status: 'status',
    data: {
      watchlist,
    },
  });
});

// get seen list
exports.getSeenList = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(MovieList.find({ seen: true }), req.query)
    .sort('+amandaRating')
    .limitFields()
    .paginate();
  const watchlist = await features.query.select('-numVotes');

  res.status(200).json({
    status: 'status',
    data: {
      watchlist,
    },
  });
});

// give a movie an amanda rating
exports.rateMovie = catchAsync(async (req, res, next) => {
  let updateData = { seen: true, votes: 0 };
  if (req.body.rating)
    updateData = { ...updateData, amandaRating: req.body.rating };

  const movie = await MovieList.findOneAndUpdate(
    { imdbID: req.params.imdbID },
    updateData,
    { runValidators: true },
  );

  await User.deleteVotesFor(movie._id);

  res.status(200).json({
    status: 'status',
    data: {
      movie: {
        id: movie._id,
        imdbID: movie.imdbID,
        title: movie.title,
      },
      rating: movie.amandaRating,
    },
  });
});

// move seen movie back to watchlist
exports.unwatch = catchAsync(async (req, res, next) => {
  const movie = await MovieList.findOneAndUpdate(
    { imdbID: req.params.imdbID },
    { seen: false },
    { runValidators: true },
  );

  res.status(200).json({
    status: 'status',
    data: {
      movie: {
        id: movie._id,
        imdbID: movie.imdbID,
        title: movie.title,
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

  res.status(200).json({
    status: 'status',
    data: {},
  });
});
