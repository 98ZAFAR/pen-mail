//Basic Configuration
require('dotenv').config();

// Environment Validation
const { validateEnv } = require('./utils/envValidator');
validateEnv();

const mongoose = require('./configs/dbConfig');
const cookieParser = require('cookie-parser');

// Importing required modules
const express = require('express');
const cors = require('cors');
const { generalLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

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

// Apply rate limiting to all routes
app.use(generalLimiter);

//Scheduler Setup
require('./services/schedulers/letterDelivery');

// Importing Routes
const authRoutes = require('./routes/auth/routes');
const adminRoutes = require('./routes/admin/routes');
const userRoutes = require('./routes/user/routes');
const generalRoutes = require('./routes/general/routes');
const letterRoutes = require('./routes/letter/routes');
const stampRoutes = require('./routes/stamp/routes');
const notificationRoutes = require('./routes/notification/routes');

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
app.use('/api/notification', ValidateUser, notificationRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// 404 Handler
app.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error Handler Middleware (Must be last)
app.use(errorHandler);

// App Running
app.listen(PORT, () => {
  logger.success(`Server is running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
});
