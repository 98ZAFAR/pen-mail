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

// Importing Routes
const authRoutes = require('./routes/auth/routes');
const userRoutes = require('./routes/user/routes');

//Home Route
app.get('/', (req, res) => {
    res.status(200).json({message:"Welcome to Pen Mail API!"});
});

// Using Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
