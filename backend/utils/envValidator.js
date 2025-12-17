const logger = require("./logger");

// Required environment variables
const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIENT_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

const validateEnv = () => {
  const missingVars = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    logger.error(
      "Missing required environment variables:",
      { missingVars }
    );
    logger.error(
      "Please create a .env file in the root directory with all required variables"
    );
    process.exit(1);
  }

  logger.success("Environment variables validated successfully");
};

const getEnvConfig = () => {
  return {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
    },
  };
};

module.exports = {
  validateEnv,
  getEnvConfig,
};
