const { body, validationResult } = require('express-validator')
const contactValidationRules = () => {
  return [
    // name must be a valid alphabetical string with a minimum of 2 characters
    body('name').isLength({ min: 2 }).trim().withMessage('Name must have more than 2 characters'),

    // phone must respect the phone format
    
    body('phoneNumber').matches(/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/).withMessage('Phone number is invalid'),

    // email must respect email format
    body('email').isEmail().withMessage('Email is invalid'),

   
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ data: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
contactValidationRules,
  validate,
}