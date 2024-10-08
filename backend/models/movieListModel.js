// tt0097576
// tt0083658
const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, 'Movie needs a title'],
    trim: true,
  },
  Year: {
    type: String,
    required: [true, 'Movie needs a year'],
    trim: true,
  },
  Runtime: {
    type: String,
    required: [true, 'Movie needs a runtime'],
    trim: true,
  },
  Genre: {
    type: String,
    required: [true, 'Movie needs a genre'],
    trim: true,
  },
  Plot: {
    type: String,
    required: [true, 'Movie needs a plot'],
    trim: true,
  },
  Actors: {
    type: String,
    trim: true,
  },
  Director: {
    type: String,
    trim: true,
  },
  Poster: {
    type: String,
    required: [true, 'Movie needs a poster link'],
  },
  rottenTomatoRating: {
    type: Number,
    required: [true, 'Movie needs a rotten tomatoes rating'],
  },
  imdbID: {
    type: String,
    unique: true,
    required: [true, 'Movie needs an imdbID'],
    trim: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  amandaRating: {
    type: Number,
    min: [0, 'Rating must be >= 0'],
    max: [5, 'Rating must be <= 5'],
  },
  recommendedByName: {
    type: String,
    trim: true,
  },
  recommendedById: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  numVotes: {
    type: Number,
    default: 0,
  },
});

// populate the recommendedById
movieListSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'recommendedById',
    select: 'username',
  });
  next();
});

const MovieList = mongoose.model('MovieList', movieListSchema);

module.exports = MovieList;
