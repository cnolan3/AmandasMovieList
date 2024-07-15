const mongoose = require('mongoose');
const dotenv = require('dotenv');

let fileArray = [`${__dirname}/config.version.env`];
if (process.argv.length > 2) {
  const configFile = process.argv[2];
  fileArray = [...fileArray, `${__dirname}/${configFile}`];
}

dotenv.config({ path: fileArray });

const logger = require('./utils/logger');

logger.info(`Loaded config file/s [${fileArray}]`);

logger.info(`API version: ${process.env.API_VERSION}`);
logger.info(`Running in ${process.env.NODE_ENV} environment`);

// process.on('uncaughtRejection', (err) => {
//   console.log('Uncaught exception, shutting down...');
//   process.exit(1);
// });

logger.verbose('Application starting...');

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => logger.info('DB connection successful'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});

logger.silly('Your wish is my command!');

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled exception, shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });
