const AppError = require('../utils/appError');
const logger = require('../utils/logger');

// specific error handlers
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/"(.*?)"/g)[0];

  return new AppError(
    `Duplicate field value: ${value}. Please use another value`,
    400,
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);

  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401);

const handleJWTExpired = () =>
  new AppError('Login token has expired, Please log in again', 401);

///////////////

// format and send error in dev mode
const sendErrorDev = (err, res) => {
  const { status, message, stack } = err;
  res.status(err.statusCode).json({
    status,
    error: err,
    message,
    stack,
  });
};

// format and send error in prod mode
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    logger.error(`UNKNOWN ERROR: ${err}`);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

// classify and handle errors
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let appErrorObj = err;

    if (err.name === 'CastError') appErrorObj = handleCastErrorDB(err);
    if (err.code === 11000) appErrorObj = handleDuplicateFieldDB(err);
    if (err.name === 'ValidationError')
      appErrorObj = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') appErrorObj = handleJWTError();
    if (err.name === 'TokenExpiredError') appErrorObj = handleJWTExpired();

    sendErrorProd(appErrorObj, res);
  }
};
