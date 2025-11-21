import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  photos?: string[];
  response?: {
    message: string;
    respondedAt: Date;
  };
  isApproved: boolean;
  isFlagged: boolean;
  flagReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    photos: [String],
    response: {
      message: String,
      respondedAt: Date,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    flagReason: String,
  },
  {
    timestamps: true,
  }
);

// Update vendor rating when review is created or updated
reviewSchema.post('save', async function () {
  const Review = mongoose.model('Review');
  const Vendor = mongoose.model('Vendor');

  const stats = await Review.aggregate([
    {
      $match: {
        vendorId: this.vendorId,
        isApproved: true,
      },
    },
    {
      $group: {
        _id: '$vendorId',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Vendor.findByIdAndUpdate(this.vendorId, {
      rating: stats[0].avgRating,
      totalReviews: stats[0].totalReviews,
    });
  }
});

export default mongoose.model<IReview>('Review', reviewSchema);
