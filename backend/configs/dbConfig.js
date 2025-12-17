require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/penMail?retryWrites=true&w=majority';

mongoose.connect(dbURI)
.then(() => {
  logger.success('MongoDB connected successfully');
})
.catch((err) => {
  logger.error('MongoDB connection error', { error: err.message });
  process.exit(1);
});
module.exports = mongoose;