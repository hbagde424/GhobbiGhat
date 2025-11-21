import mongoose, { Document, Schema } from 'mongoose';

export interface IBankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
}

export interface IBusinessHours {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface IVendor extends Document {
  userId: mongoose.Types.ObjectId;
  businessName: string;
  ownerName: string;
  businessEmail: string;
  businessPhone: string;
  serviceAreas: string[]; // pincodes
  description?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  
  // Verification Documents
  governmentIdType: 'aadhar' | 'pan' | 'gst' | 'trade_license';
  governmentIdNumber: string;
  governmentIdDocument: string; // URL
  businessProof?: string; // URL
  
  // Bank Details
  bankDetails: IBankDetails;
  
  // Services & Pricing
  services: mongoose.Types.ObjectId[]; // References to Service model
  customPricing?: Map<string, number>;
  
  // Business Hours
  businessHours: IBusinessHours[];
  
  // Stats
  rating: number;
  totalReviews: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  
  // Financial
  totalEarnings: number;
  pendingEarnings: number;
  commissionRate: number; // Percentage
  
  // Gallery
  gallery: string[]; // URLs
  
  // Status
  isVerified: boolean;
  isApproved: boolean;
  isActive: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const bankDetailsSchema = new Schema<IBankDetails>({
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  branch: String,
});

const businessHoursSchema = new Schema<IBusinessHours>({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  openTime: String,
  closeTime: String,
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const vendorSchema = new Schema<IVendor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    serviceAreas: [{
      type: String,
      required: true,
    }],
    description: String,
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    governmentIdType: {
      type: String,
      enum: ['aadhar', 'pan', 'gst', 'trade_license'],
      required: true,
    },
    governmentIdNumber: {
      type: String,
      required: true,
    },
    governmentIdDocument: {
      type: String,
      required: true,
    },
    businessProof: String,
    bankDetails: {
      type: bankDetailsSchema,
      required: true,
    },
    services: [{
      type: Schema.Types.ObjectId,
      ref: 'Service',
    }],
    customPricing: {
      type: Map,
      of: Number,
    },
    businessHours: [businessHoursSchema],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    completedOrders: {
      type: Number,
      default: 0,
    },
    cancelledOrders: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    pendingEarnings: {
      type: Number,
      default: 0,
    },
    commissionRate: {
      type: Number,
      default: 15,
    },
    gallery: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: String,
  },
  {
    timestamps: true,
  }
);

// Index for location-based search
vendorSchema.index({ pincode: 1, isApproved: 1, isActive: 1 });
vendorSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

export default mongoose.model<IVendor>('Vendor', vendorSchema);
