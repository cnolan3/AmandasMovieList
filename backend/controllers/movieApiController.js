const catchAsync = require('../utils/catchAsync');
const OMDBSearch = require('../utils/omdbSearch');
const OMDBGet = require('../utils/omdbGet');
// const logger = require('../utils/logger');

// search omdb for a movie
exports.searchMovies = catchAsync(async (req, res, next) => {
  const { search } = req.params;

  let omdb;
  if (req.query.page) {
    omdb = new OMDBSearch(search).page(req.query.page);
  } else {
    omdb = new OMDBSearch(search);
  }

  const data = await omdb.send();

  res.status(200).json({
    status: 'success',
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

  const omdb = new OMDBGet().imdbID(imdbID);
  const data = await omdb.send();

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

// get info on a movie by title
exports.getMovieByTitle = catchAsync(async (req, res, next) => {
  const { title } = req.params;

  const omdb = new OMDBGet().title(title);
  const data = await omdb.send();

  res.status(200).json({
    status: 'success',
    data: data,
  });
});
