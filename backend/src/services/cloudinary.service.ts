import cloudinary from '../config/cloudinary';
import { ValidationError } from '../utils/errors';
import streamifier from 'streamifier';

export interface CloudinaryUploadResult {
    url: string;
    publicId: string;
    secureUrl: string;
}

/**
 * Upload image buffer to Cloudinary
 */
export const uploadToCloudinary = async (
    buffer: Buffer,
    folder: string = 'dhobighat'
): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [
                    { width: 1200, height: 1200, crop: 'limit' },
                    { quality: 'auto:good' },
                ],
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(new ValidationError(`Failed to upload image: ${error.message || JSON.stringify(error)}`));
                } else if (result) {
                    resolve({
                        url: result.url,
                        publicId: result.public_id,
                        secureUrl: result.secure_url,
                    });
                } else {
                    reject(new ValidationError('Cloudinary upload failed: No result returned'));
                }
            }
        );

        try {
            streamifier.createReadStream(buffer).pipe(uploadStream);
        } catch (error: any) {
            reject(new ValidationError(`Stream creation failed: ${error.message}`));
        }
    });
};

/**
 * Upload multiple images to Cloudinary
 */
export const uploadMultipleToCloudinary = async (
    files: Express.Multer.File[],
    folder: string = 'dhobighat'
): Promise<CloudinaryUploadResult[]> => {
    try {
        if (!files || files.length === 0) return [];
        const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, folder));
        return await Promise.all(uploadPromises);
    } catch (error: any) {
        console.error('Multiple upload error:', error);
        const msg = error?.message || (typeof error === 'string' ? error : 'Unknown error');
        throw new ValidationError(`Failed to upload multiple images: ${msg}`);
    }
};

/**
 * Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        console.error(`Failed to delete image from Cloudinary: ${error.message}`);
        // Don't throw error, just log it
    }
};

/**
 * Delete multiple images from Cloudinary
 */
export const deleteMultipleFromCloudinary = async (publicIds: string[]): Promise<void> => {
    try {
        await Promise.all(publicIds.map((id) => deleteFromCloudinary(id)));
    } catch (error: any) {
        console.error(`Failed to delete multiple images: ${error.message}`);
    }
};

/**
 * Upload pickup photos
 */
export const uploadPickupPhotos = async (
    files: Express.Multer.File[],
    orderNumber: string
): Promise<string[]> => {
    const folder = `dhobighat/orders/${orderNumber}/pickup`;
    const results = await uploadMultipleToCloudinary(files, folder);
    return results.map((r) => r.secureUrl);
};

/**
 * Upload delivery photos
 */
export const uploadDeliveryPhotos = async (
    files: Express.Multer.File[],
    orderNumber: string
): Promise<string[]> => {
    const folder = `dhobighat/orders/${orderNumber}/delivery`;
    const results = await uploadMultipleToCloudinary(files, folder);
    return results.map((r) => r.secureUrl);
};

/**
 * Upload item photos
 */
export const uploadItemPhotos = async (
    files: Express.Multer.File[],
    orderNumber: string,
    itemType: string
): Promise<string[]> => {
    const folder = `dhobighat/orders/${orderNumber}/items/${itemType}`;
    const results = await uploadMultipleToCloudinary(files, folder);
    return results.map((r) => r.secureUrl);
};
