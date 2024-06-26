const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie needs a title'],
    trim: true,
  },
  year: {
    type: String,
    required: [true, 'Movie needs a year'],
    trim: true,
  },
  runtime: {
    type: String,
    required: [true, 'Movie needs a runtime'],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'Movie needs a genre'],
    trim: true,
  },
  plot: {
    type: String,
    required: [true, 'Movie needs a plot'],
    trim: true,
  },
  poster: {
    type: String,
    required: [true, 'Movie needs a poster link'],
  },
  rottenTomatoRating: {
    type: String,
    required: [true, 'Movie needs a rotten tomatoes rating'],
    trim: true,
  },
  imdbID: {
    type: String,
    required: [true, 'Movie needs an imdbID'],
    trim: true,
  },
  amandaRating: {
    type: Number,
  },
  recommendedByName: {
    type: String,
    trim: true,
  },
  recommendedById: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// populate the recommendedById
movieListSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'recommendedById',
    select: 'username',
  });
});

const MovieList = mongoose.model('MovieList', movieListSchema);

module.exports = MovieList;
