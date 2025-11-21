import { useEffect, useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { vendorAPI } from '@/services/vendor.service';
import { toast } from 'sonner';

interface Review {
    _id: string;
    user: {
        name: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

export default function VendorReviews() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        },
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = (await vendorAPI.getDashboard()) as any;
            const dashboardStats = response.data?.stats ?? response.stats ?? {};

            // Mock reviews for now since we don't have a dedicated reviews endpoint yet
            // In a real app, we would fetch from /api/vendors/reviews
            setStats({
                averageRating: dashboardStats.rating || 0,
                totalReviews: dashboardStats.totalReviews || 0,
                ratingDistribution: {
                    5: dashboardStats.totalReviews ? Math.floor(dashboardStats.totalReviews * 0.6) : 0,
                    4: dashboardStats.totalReviews ? Math.floor(dashboardStats.totalReviews * 0.3) : 0,
                    3: dashboardStats.totalReviews ? Math.floor(dashboardStats.totalReviews * 0.1) : 0,
                    2: 0,
                    1: 0,
                },
            });

            // Empty reviews list for now
            setReviews([]);
        } catch (error: any) {
            console.error('Failed to fetch reviews:', error);
            toast.error(error.response?.data?.message || 'Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
                    <p className="text-gray-600 mt-2">See what your customers are saying about you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Rating Overview */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardHeader>
                            <CardTitle>Rating Overview</CardTitle>
                            <CardDescription>Based on {stats.totalReviews} reviews</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold text-gray-900 mb-2">
                                    {stats.averageRating.toFixed(1)}
                                </div>
                                <div className="flex justify-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.round(stats.averageRating)
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">Average Rating</p>
                            </div>

                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-2">
                                        <div className="text-sm font-medium w-3">{rating}</div>
                                        <Star className="h-3 w-3 text-gray-400" />
                                        <Progress
                                            value={
                                                stats.totalReviews > 0
                                                    ? ((stats.ratingDistribution as any)[rating] / stats.totalReviews) * 100
                                                    : 0
                                            }
                                            className="h-2"
                                        />
                                        <div className="text-xs text-gray-500 w-8 text-right">
                                            {(stats.ratingDistribution as any)[rating]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reviews List */}
                    <div className="lg:col-span-2 space-y-4">
                        {reviews.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Reviews will appear here once customers rate your service
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            reviews.map((review) => (
                                <Card key={review._id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                                    {review.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= review.rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {review.comment}
                                        </p>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Button variant="ghost" size="sm" className="text-gray-500">
                                                <ThumbsUp className="mr-2 h-4 w-4" />
                                                Helpful
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
