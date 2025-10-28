const { body, param } = require("express-validator");

const sendLetterValidation = [
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Subject must be between 1 and 200 characters"),
  
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Letter body is required")
    .isLength({ min: 1, max: 5000 })
    .withMessage("Letter body must be between 1 and 5000 characters"),
  
  body("recipientId")
    .optional()
    .isMongoId()
    .withMessage("Invalid recipient ID"),
  
  body("stampId")
    .optional()
    .isMongoId()
    .withMessage("Invalid stamp ID"),
  
  body("isDraft")
    .optional()
    .isBoolean()
    .withMessage("isDraft must be a boolean"),
];

const letterIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid letter ID"),
];

module.exports = {
  sendLetterValidation,
  letterIdValidation,
};
