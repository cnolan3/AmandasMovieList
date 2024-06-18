const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, colorize, simple, prettyPrint } = winston.format;
const logDir = `${__dirname}/../logs`;

const levelColors = {
  error: 'brightRed',
  warn: 'yellow',
  info: 'grey',
  http: 'blue',
  verbose: 'cyan',
  debug: 'green',
  silly: 'magenta',
};

const logger = winston.createLogger({
  exitOnError: true,
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ colors: levelColors }), simple()),
    }),
    new winston.transports.DailyRotateFile({
      format: combine(timestamp(), prettyPrint()),
      filename: `${logDir}/combined-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/exceptions.log`,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/rejections.log`,
    }),
  ],
});

module.exports = logger;
