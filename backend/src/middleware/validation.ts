import { body, query, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid Indian phone number'),
];

export const loginValidation: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const vendorRegisterValidation: ValidationChain[] = [
  ...registerValidation,
  body('businessName')
    .trim()
    .notEmpty()
    .withMessage('Business name is required'),
  body('businessPhone')
    .trim()
    .notEmpty()
    .withMessage('Business phone is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('pincode')
    .trim()
    .notEmpty()
    .withMessage('Pincode is required')
    .matches(/^\d{6}$/)
    .withMessage('Please provide a valid 6-digit pincode'),
  body('serviceAreas')
    .isArray({ min: 1 })
    .withMessage('At least one service area is required'),
];

export const orderValidation: ValidationChain[] = [
  body('vendorId')
    .notEmpty()
    .withMessage('Vendor ID is required')
    .isMongoId()
    .withMessage('Invalid vendor ID'),
  body('serviceType')
    .notEmpty()
    .withMessage('Service type is required')
    .isMongoId()
    .withMessage('Invalid service type'),
  body('pickupAddress').notEmpty().withMessage('Pickup address is required'),
  body('pickupDate')
    .notEmpty()
    .withMessage('Pickup date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('pickupTimeSlot').notEmpty().withMessage('Pickup time slot is required'),
];

export const reviewValidation: ValidationChain[] = [
  body('orderId')
    .notEmpty()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Invalid order ID'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 1000 })
    .withMessage('Comment must not exceed 1000 characters'),
];

export const paginationValidation: ValidationChain[] = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];
