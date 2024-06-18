const AppError = require('../utils/appError');
const logger = require('../utils/logger');

const sendErrorDev = (err, res) => {
  const { status, message, stack } = err;
  res.status(err.statusCode).json({
    status,
    error: err,
    message,
    stack,
  });
};

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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    const error = { ...err };

    sendErrorProd(error, res);
  }
};
