import mongoose, { Document, Schema } from 'mongoose';

export interface IPayout extends Document {
  vendorId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  orders: mongoose.Types.ObjectId[];
  transactionId?: string;
  processedBy?: mongoose.Types.ObjectId;
  processedAt?: Date;
  failureReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const payoutSchema = new Schema<IPayout>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order',
    }],
    transactionId: String,
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    processedAt: Date,
    failureReason: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPayout>('Payout', payoutSchema);
