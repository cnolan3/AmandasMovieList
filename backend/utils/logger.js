const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, colorize, simple, json, prettyPrint } =
  winston.format;

let logDir = `${__dirname}/../devlogs`;
if (process.env.NODE_ENV === 'production') logDir = `${__dirname}/../logs`;

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
  transports:
    process.env.NODE_ENV === 'development'
      ? [
          new winston.transports.Console({
            format: combine(colorize({ colors: levelColors }), simple()),
          }),
          new winston.transports.DailyRotateFile({
            format: combine(timestamp(), prettyPrint()),
            filename: `${logDir}/combined-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d',
          }),
        ]
      : [
          new winston.transports.Console({
            format: combine(json()),
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
