const mongoose = require('mongoose');
const dotenv = require('dotenv');

let configFile;
if (process.argv.length > 2) {
  configFile = process.argv[2];
  dotenv.config({ path: `${__dirname}/${configFile}` });
}

const logger = require('./utils/logger');

if (configFile) logger.info(`Loaded config file ${configFile}`);

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
