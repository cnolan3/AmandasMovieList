const logger = require('./logger');
const NodeCache = require('node-cache');

const cache = new NodeCache();

const userKey = (userId) => `user-${userId}`;
const userTTL = 1000 * 60 * 60; // 1 hour
const watchListKey = 'watchlist';
const seenListKey = 'seenlist';
const movieIdKey = (movieId) => `movieID-${movieId}`;
const movieTitleKey = (movieName) => `movieName-${movieName}`;
const movieSearchKey = (query) => `movieSearch-${query}`;
const movieTTL = 1000 * 60 * 10; // 10 minutes
const movieSearchTTL = 1000 * 60 * 2; // 2 minutes
const a = 1;

// other logging
cache.on('set', (key, value) => logger.verbose(`Set key in cache: ${key}`));
cache.on('del', (key, value) =>
  logger.verbose(`Invalidate key in cache: ${key}`),
);
cache.on('flush', () => logger.verbose('Invalidate all cache data'));

// user cache functions
exports.storeUser = (user) => cache.set(userKey(user._id), user, userTTL);

exports.getUser = (userId) => {
  const data = cache.get(userKey(userId));
  if (data) logger.verbose(`Get user cache hit, id: ${userId}`);
  else logger.verbose(`Get user cache miss, id: ${userId}`);
  return data;
};

// list cache functions
exports.storeWatchList = (watchList) => cache.set(watchListKey, watchList, 0);

exports.getWatchList = () => {
  const data = cache.get(watchListKey);
  if (data) logger.verbose(`Get watchlist cache hit`);
  else logger.verbose(`Get watchlist cache miss`);
  return data;
};

exports.invalidateWatchList = () => cache.del(watchListKey);

exports.storeSeenList = (seenList) => cache.set(seenListKey, seenList, 0);

exports.getSeenList = () => {
  const data = cache.get(seenListKey);
  if (data) logger.verbose(`Get seenlist cache hit`);
  else logger.verbose(`Get seenlist cache miss`);
  return data;
};

exports.invalidateSeenList = () => cache.del(seenListKey);

exports.invalidateLists = () => cache.del([watchListKey, seenListKey]);

// movie api cache functions
exports.storeMovieById = (movie) =>
  cache.set(movieIdKey(movie.imdbID), movie, movieTTL);

exports.getMovieById = (imdbID) => {
  const data = cache.get(movieIdKey(imdbID));
  if (data) logger.verbose(`Get movieId cache hit, id: ${imdbID}`);
  else logger.verbose(`Get movieId cache miss, id: ${imdbID}`);
  return data;
};

exports.storeMovieByTitle = (movie) =>
  cache.set(movieTitleKey(movie.Title), movie, movieTTL);

exports.getMovieByTitle = (title) => {
  const data = cache.get(movieTitleKey(title));
  if (data) logger.verbose(`Get movieTitle cache hit, title: ${title}`);
  else logger.verbose(`Get movieTitle cache miss, title: ${title}`);
  return data;
};

exports.storeMovieSearch = (query, results) =>
  cache.set(movieSearchKey(query), results, movieSearchTTL);

exports.getMovieSearch = (query) => {
  const data = cache.get(movieSearchKey(query));
  if (data) logger.verbose(`Get movieSearch cache hit, query: ${query}`);
  else logger.verbose(`Get movieSearch cache miss, query: ${query}`);
  return data;
};

// invalidate all
exports.invalidateAll = () => cache.flushAll();

// get stats
exports.getStats = () => {
  const data = cache.getStats();
  logger.verbose(`Get cache stats: ${data}`);
  return data;
};
