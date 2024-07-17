const catchAsync = require('../utils/catchAsync');
const OMDBSearch = require('../utils/omdbSearch');
const OMDBGet = require('../utils/omdbGet');
const AppError = require('../utils/appError');
// const logger = require('../utils/logger');
const cache = require('../utils/nodeCache');

// search omdb for a movie
exports.searchMovies = catchAsync(async (req, res, next) => {
  const { search } = req.params;

  // check cache for search results
  let data = cache.getMovieSearch(search);

  if (!data) {
    let omdb;
    if (req.query.page) {
      omdb = new OMDBSearch(search).page(req.query.page);
    } else {
      omdb = new OMDBSearch(search);
    }

    data = await omdb.send();
  }

  if (!data.Search) return next(new AppError('No search results found', 404));

  // store search results in cache
  cache.storeMovieSearch(search, data);

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: {
      numResults: data.Search.length,
      Search: data.Search,
      totalResults: data.totalResults * 1,
    },
  });
});

// get info on a movie by imdbID
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { imdbID } = req.params;

  // check cache for movie id
  let data = cache.getMovieById(imdbID);

  if (!data) {
    const omdb = new OMDBGet().imdbID(imdbID);
    data = await omdb.send();

    cache.storeMovieById(data);
  }

  // check for a rotten tomatoes rating
  const rotten = data.Ratings.find(
    (element) => element.Source === 'Rotten Tomatoes',
  );

  // -1 represents a N/A rotten tomato rating
  let rottenPercent = -1;
  if (rotten) rottenPercent = parseFloat(rotten.Value);

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: { ...data, rottenTomatoRating: rottenPercent },
  });
});

// get info on a movie by title
exports.getMovieByTitle = catchAsync(async (req, res, next) => {
  const { title } = req.params;

  // check cache for title
  let data = cache.getMovieByTitle(title);

  if (!data) {
    const omdb = new OMDBGet().title(title);
    data = await omdb.send();

    cache.storeMovieByTitle(data);
  }

  // check for a rotten tomatoes rating
  const rotten = data.Ratings.find(
    (element) => element.Source === 'Rotten Tomatoes',
  );

  // -1 represents a N/A rotten tomato rating
  let rottenPercent = -1;
  if (rotten) rottenPercent = parseFloat(rotten.Value);

  res.status(200).json({
    status: 'success',
    apiVersion: req.apiVersion,
    data: { ...data, rottenTomatoRating: rottenPercent },
  });
});
