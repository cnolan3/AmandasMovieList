const express = require('express');
const morgan = require('morgan');
const stripAnsi = require('./utils/stripAnsi');

const errorController = require('./controllers/errorController');

const AppError = require('./utils/appError');
const logger = require('./utils/logger');

const app = express();

// http logging
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan('dev', {
      stream: {
        write: (message) => logger.http(stripAnsi(message.trim())),
      },
    }),
  );
}

// body parser
app.use(express.json({ limit: '10kb' }));

app.get('*', (req, res, next) => {
  return next(new AppError('TEST ERROR', 500));
});

app.use(errorController);

module.exports = app;
