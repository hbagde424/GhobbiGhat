import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  itemType: string; // e.g., "Shirt", "Pants", "Jeans"
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
  condition?: string; // Pre-existing stains or damages
  photos?: string[]; // URLs of item photos
}

export interface IOrder extends Document {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  
  // Service Details
  serviceType: mongoose.Types.ObjectId;
  items: IOrderItem[];
  
  // Pickup & Delivery
  pickupAddress: {
    fullAddress: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryAddress: {
    fullAddress: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  pickupDate: Date;
  pickupTimeSlot: string;
  deliveryDate?: Date;
  deliveryTimeSlot?: string;
  
  // Special Instructions
  specialInstructions?: string;
  
  // Status Tracking
  status: 'pending' | 'accepted' | 'picked_up' | 'in_progress' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusHistory: {
    status: string;
    timestamp: Date;
    notes?: string;
  }[];
  
  // Payment
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  
  // Commission
  commissionRate: number;
  commissionAmount: number;
  vendorEarning: number;
  
  // Photos (after pickup)
  clothesPhotos: string[];
  
  // Ratings & Review
  rating?: number;
  review?: string;
  reviewDate?: Date;
  
  // Cancellation
  cancellationReason?: string;
  cancelledBy?: 'user' | 'vendor' | 'admin';
  cancelledAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  itemType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerItem: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: String,
  photos: [String],
});

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    items: [orderItemSchema],
    pickupAddress: {
      fullAddress: { type: String, required: true },
      landmark: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    deliveryAddress: {
      fullAddress: { type: String, required: true },
      landmark: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    pickupTimeSlot: {
      type: String,
      required: true,
    },
    deliveryDate: Date,
    deliveryTimeSlot: String,
    specialInstructions: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'picked_up', 'in_progress', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    statusHistory: [{
      status: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      notes: String,
    }],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cod'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    commissionRate: {
      type: Number,
      required: true,
    },
    commissionAmount: {
      type: Number,
      required: true,
    },
    vendorEarning: {
      type: Number,
      required: true,
    },
    clothesPhotos: [String],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    reviewDate: Date,
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
    },
    cancelledAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ vendorId: 1, status: 1 });
// `orderNumber` has `unique: true` in the schema definition
// which already creates an index, so avoid declaring a duplicate index here.
// orderSchema.index({ orderNumber: 1 });

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `DG${Date.now()}${count + 1}`;
  }
  next();
});

export default mongoose.model<IOrder>('Order', orderSchema);
