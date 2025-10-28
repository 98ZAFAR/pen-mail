const { body } = require("express-validator");

const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
  
  body("nickName")
    .trim()
    .notEmpty()
    .withMessage("Nickname is required")
    .matches(/^[a-zA-Z0-9_]{3,20}$/)
    .withMessage("Nickname must be 3-20 characters and contain only letters, numbers, and underscores"),
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  
  body("countryCode")
    .notEmpty()
    .withMessage("Country code is required")
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

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
];

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
