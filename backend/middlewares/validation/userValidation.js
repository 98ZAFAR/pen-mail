const { body, param } = require("express-validator");

const userIdValidation = [
  param("userId")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID"),
  
  param("friendId")
    .optional()
    .isMongoId()
    .withMessage("Invalid friend ID"),
];

const updateProfileValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
  
  body("nickName")
    .optional()
    .trim()
    .matches(/^[a-zA-Z0-9_]{3,20}$/)
    .withMessage("Nickname must be 3-20 characters and contain only letters, numbers, and underscores"),
  
  body("countryCode")
    .optional()
    .matches(/^[A-Z]{2}$/)
    .withMessage("Country code must be a valid 2-letter code"),
  
  body("languages")
    .optional()
    .isArray({ max: 5 })
    .withMessage("Languages must be an array with maximum 5 items"),
  
  body("interests")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Interests must be an array with maximum 10 items"),
];

const requestIdValidation = [
  param("requestId")
    .isMongoId()
    .withMessage("Invalid request ID"),
];

module.exports = {
  userIdValidation,
  updateProfileValidation,
  requestIdValidation,
};
