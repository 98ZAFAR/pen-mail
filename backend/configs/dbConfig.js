require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/penMail?retryWrites=true&w=majority';

mongoose.connect(dbURI)
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
module.exports = mongoose;