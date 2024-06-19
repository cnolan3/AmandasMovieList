const AppError = require('../utils/appError');
const logger = require('../utils/logger');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);

  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

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

  logger.verbose(JSON.stringify(err));

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let appErrorObj;

    if (err.name === 'ValidationError')
      appErrorObj = handleValidationErrorDB(err);

    sendErrorProd(appErrorObj, res);
  }
};
