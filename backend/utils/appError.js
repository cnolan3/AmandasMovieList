const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    logger.error(
      `AppError - ${this.status} ${this.statusCode}, operational: ${this.isOperational}\n${this.stack}`,
    );
  }
}

module.exports = AppError;
