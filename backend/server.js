//Basic Configuration
require('dotenv').config();
const mongoose = require('./configs/dbConfig');
const cookieParser = require('cookie-parser');

// Importing required modules
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Express Middleware Setup
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent with requests
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Scheduler Setup
require('./services/schedulers/letterDelivery');

// Importing Routes
const authRoutes = require('./routes/auth/routes');
const adminRoutes = require('./routes/admin/routes');
const userRoutes = require('./routes/user/routes');
const generalRoutes = require('./routes/general/routes');
const letterRoutes = require('./routes/letter/routes');
const stampRoutes = require('./routes/stamp/routes');

// Importing Custom Middlewares
const { ValidateUser } = require('./middlewares/auth/verifyUser');
const AuthorizeAdmin = require('./middlewares/auth/authorize');

// Routes Setup
app.use('/api', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', ValidateUser, AuthorizeAdmin, adminRoutes);
app.use('/api/user', ValidateUser, userRoutes);
app.use('/api/stamp', ValidateUser, stampRoutes);
app.use('/api/letter', ValidateUser, letterRoutes);

// App Running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
