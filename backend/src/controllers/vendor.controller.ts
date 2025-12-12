import { Response, NextFunction } from 'express';
import Vendor from '../models/Vendor';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ConflictError } from '../utils/errors';
import { uploadMultipleToCloudinary } from '../services/upload.service';

// Register Vendor
export const registerVendor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.id;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ userId });
    if (existingVendor) {
      throw new ConflictError('Vendor profile already exists');
    }

    // Upload documents
    const files = req.files as Express.Multer.File[];
    let documentUrls: string[] = [];

    if (files && files.length > 0) {
      try {
        documentUrls = await uploadMultipleToCloudinary(files, 'vendors/documents');
      } catch (uploadError) {
        console.warn('Document upload failed:', uploadError);
        // Continue without documents in development
      }
    }

    // Parse serviceAreas from comma-separated string
    let serviceAreas = req.body.serviceAreas;
    if (typeof serviceAreas === 'string') {
      serviceAreas = serviceAreas.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const vendorData = {
      userId,
      ...req.body,
      serviceAreas,
      governmentIdDocument: documentUrls[0] || '',
      businessProof: documentUrls[1] || undefined,
    };

    const vendor = await Vendor.create(vendorData);

    // Update user role to vendor
    await User.findByIdAndUpdate(userId, { role: 'vendor' });

    res.status(201).json({
      success: true,
      message: 'Vendor registration submitted. Awaiting approval.',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Get Vendor Profile
export const getVendorProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id })
      .populate('userId', 'name email phone')
      .populate('services');

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    res.json({
      success: true,
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Update Vendor Profile
export const updateVendorProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const allowedUpdates = [
      'businessName',
      'businessPhone',
      'description',
      'serviceAreas',
      'businessHours',
    ];

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        (vendor as any)[key] = req.body[key];
      }
    });

    await vendor.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Search Vendors
export const searchVendors = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { pincode, city, page = 1, limit = 10 } = req.query;

    const query: any = {
      isApproved: true,
      isActive: true,
    };

    if (pincode) {
      query.serviceAreas = pincode;
    } else if (city) {
      query.city = new RegExp(city, 'i');
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const vendors = await Vendor.find(query)
      .populate('services')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    const total = await Vendor.countDocuments(query);

    res.json({
      success: true,
      data: {
        vendors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Vendor By ID
export const getVendorById = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId)
      .populate('services')
      .populate('userId', 'name email phone');

    if (!vendor || !vendor.isApproved || !vendor.isActive) {
      throw new NotFoundError('Vendor not found');
    }

    res.json({
      success: true,
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Update Bank Details
export const updateBankDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    vendor.bankDetails = req.body;
    await vendor.save();

    res.json({
      success: true,
      message: 'Bank details updated successfully',
      data: { bankDetails: vendor.bankDetails },
    });
  } catch (error) {
    next(error);
  }
};

// Get Vendor Dashboard Stats
export const getVendorDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const stats = {
      totalOrders: vendor.totalOrders,
      completedOrders: vendor.completedOrders,
      cancelledOrders: vendor.cancelledOrders,
      rating: vendor.rating,
      totalReviews: vendor.totalReviews,
      totalEarnings: vendor.totalEarnings,
      pendingEarnings: vendor.pendingEarnings,
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    next(error);
  }
};

// Development helper: Seed some sample approved vendors (public)
export const seedVendors = async (_req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only seed if no approved vendors exist
    const existing = await Vendor.countDocuments({ isApproved: true });
    if (existing > 0) {
      res.json({ success: true, message: 'Approved vendors already exist' });
      return;
    }

    const mongoose = require('mongoose');
    const samples = [
      {
        userId: new mongoose.Types.ObjectId(),
        businessName: 'Sparkle Laundry',
        ownerName: 'Ramesh Kumar',
        businessEmail: 'sparkle@example.com',
        businessPhone: '9876543210',
        serviceAreas: ['560001', '560002'],
        description: 'Fast and reliable laundry service',
        address: '12 MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        governmentIdType: 'aadhar',
        governmentIdNumber: '111122223333',
        governmentIdDocument: 'https://example.com/documents/government-id-1.pdf',
        businessProof: '',
        bankDetails: {
          accountHolderName: 'Ramesh Kumar',
          accountNumber: '1234567890',
          ifscCode: 'SBIN0000001',
          bankName: 'State Bank',
          branch: 'MG Road',
        },
        services: [],
        businessHours: [],
        gallery: [],
        isVerified: true,
        isApproved: true,
        isActive: true,
        verificationStatus: 'approved',
      },
      {
        userId: new mongoose.Types.ObjectId(),
        businessName: 'Clean & Shine',
        ownerName: 'Sita Devi',
        businessEmail: 'clean@example.com',
        businessPhone: '9123456780',
        serviceAreas: ['560001'],
        description: 'Quality wash and fold',
        address: '45 Church St',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        governmentIdType: 'pan',
        governmentIdNumber: 'ABCDE1234F',
        governmentIdDocument: 'https://example.com/documents/government-id-2.pdf',
        businessProof: '',
        bankDetails: {
          accountHolderName: 'Sita Devi',
          accountNumber: '9876543210',
          ifscCode: 'HDFC0000002',
          bankName: 'HDFC Bank',
          branch: 'Church St',
        },
        services: [],
        businessHours: [],
        gallery: [],
        isVerified: true,
        isApproved: true,
        isActive: true,
        verificationStatus: 'approved',
      },
    ];

    const created = await Vendor.insertMany(samples);

    res.status(201).json({ success: true, message: 'Seeded sample vendors', data: { vendors: created } });
  } catch (error) {
    next(error);
  }
};
