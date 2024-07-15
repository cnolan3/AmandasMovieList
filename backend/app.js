const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const { xss } = require('express-xss-sanitizer');

const stripAnsi = require('./utils/stripAnsi');

const errorController = require('./controllers/errorController');

const signupKeyRoutes = require('./routes/signupKeyRoutes');
const userRoutes = require('./routes/userRoutes');
const movieListRoutes = require('./routes/movieListRoutes');
const movieApiRoutes = require('./routes/movieApiRoutes');

const AppError = require('./utils/appError');
const logger = require('./utils/logger');

const apiBaseUrl = '/api';
const apiVersion = '/v1';
const apiUrl = `${apiBaseUrl}${apiVersion}`;

logger.verbose(`api url: ${apiUrl}`);

const app = express();

// set security http headers
app.use(helmet());

app.use(cors());

app.set('views', `${__dirname}/`);

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

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
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
});
app.use(apiUrl, limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// cookie parser
app.use(cookieParser());

// NoSQL query sanitization
app.use(mongoSanitize());

// xss sanitization
app.use(xss());

// add the api version to the req object
app.use(`${apiUrl}/*`, (req, res, next) => {
  req.apiVersion = process.env.API_VERSION;

  next();
});

// routes
app.use(`${apiUrl}/movies`, movieApiRoutes);
app.use(`${apiUrl}/watchlist`, movieListRoutes);
app.use(`${apiUrl}/signupkeys`, signupKeyRoutes);
app.use(`${apiUrl}/users`, userRoutes);

app.get(`${apiBaseUrl}/`, (req, res, next) => {
  logger.verbose('get base route activated');
  res.render(`${__dirname}/index.html`);
});

app.all('*', (req, res, next) => {
  logger.verbose('catch all route activated');
  next(new AppError(`Route ${req.originalUrl} does not exist`));
});

app.use(errorController);

module.exports = app;
