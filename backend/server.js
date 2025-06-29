require('dotenv').config();
const mongoose = require('./configs/dbConfig');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


// Express Middleware Setup
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent with requests
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing Routes
const authRoutes = require('./routes/auth/routes');

//Home Route
app.get('/', (req, res) => {
    res.status(200).json({message:"Welcome to Pen Mail API!"});
});

// Auth Routes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
