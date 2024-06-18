const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const logger = require('./utils/logger');

// process.on('uncaughtRejection', (err) => {
//   console.log('Uncaught exception, shutting down...');
//   process.exit(1);
// });

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

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled exception, shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });
