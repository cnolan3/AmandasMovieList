const express = require('express');
const morgan = require('morgan');

const logger = require('./logger');

const app = express();

// http logging
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan('dev', {
      stream: {
        write: (message) => logger.http(message.trim()),
      },
    }),
  );
}

// body parser
app.use(express.json({ limit: '10kb' }));

app.get('*', (req, res, next) => {
  logger.error(new Error('uncaught error'));
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = app;
