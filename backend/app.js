const express = require('express');
const morgan = require('morgan');
const stripAnsi = require('./utils/stripAnsi');
const { xss } = require('express-xss-sanitizer');

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

// xss sanitization
app.use(xss());

// routes
app.get('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(errorController);

module.exports = app;
