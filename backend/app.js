const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');

const stripAnsi = require('./utils/stripAnsi');

const errorController = require('./controllers/errorController');

const AppError = require('./utils/appError');
const logger = require('./utils/logger');

const apiBaseUrl = '/api';
const apiVersion = '/v1';

const app = express();

// set security http headers
app.use(helmet());

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

// limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
});
app.use(apiBaseUrl, limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// NoSQL query sanitization
app.use(mongoSanitize());

// xss sanitization
app.use(xss());

// routes
app.get('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(errorController);

module.exports = app;
