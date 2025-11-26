import multer from 'multer';
import { Request } from 'express';
import { ValidationError } from '../utils/errors';
import { config } from '../config';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new ValidationError('Only image files are allowed'));
    }
};

// Create multer upload instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: config.maxFileSize, // 5MB
        files: config.maxFilesPerUpload, // 10 files
    },
});

// Middleware for single file upload
export const uploadSingle = upload.single('photo');

// Middleware for multiple file upload
export const uploadMultiple = upload.array('photos', config.maxFilesPerUpload);

// Middleware for pickup photos (multiple)
export const uploadPickupPhotos = upload.array('pickupPhotos', 20);

// Middleware for delivery photos (multiple)
export const uploadDeliveryPhotos = upload.array('deliveryPhotos', 20);

// Middleware for item photos (multiple)
export const uploadItemPhotos = upload.array('itemPhotos', 10);
