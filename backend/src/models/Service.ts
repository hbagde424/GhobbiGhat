import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  icon: string;
  category: 'wash_fold' | 'dry_cleaning' | 'ironing' | 'stain_removal' | 'premium_care' | 'other';
  basePrice: number;
  unit: 'kg' | 'piece' | 'item';
  estimatedTime: string; // e.g., "24 hours"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: String,
    category: {
      type: String,
      enum: ['wash_fold', 'dry_cleaning', 'ironing', 'stain_removal', 'premium_care', 'other'],
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['kg', 'piece', 'item'],
      required: true,
    },
    estimatedTime: {
      type: String,
      default: '24-48 hours',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>('Service', serviceSchema);
