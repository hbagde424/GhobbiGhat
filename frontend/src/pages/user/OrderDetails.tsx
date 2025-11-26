import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Package,
    MapPin,
    Calendar,
    Clock,
    ArrowLeft,
    CheckCircle2,
    Truck,
    ShoppingBag,
    CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { orderAPI } from '@/services/order.service';
import { toast } from 'sonner';

interface Order {
    _id: string;
    orderNumber: string;
    status: string;
    vendor: {
        businessName: string;
        phone: string;
    };
    pickupAddress: any;
    deliveryAddress: any;
    pickupDate: string;
    pickupTimeSlot: string;
    deliveryDate?: string;
    items: any[];
    totalAmount: number;
    subtotal: number;
    tax: number;
    deliveryCharge: number;
    discount: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    statusHistory: any[];
    pickupPhotos?: string[];
    deliveryPhotos?: string[];
    totalItemsPickedUp?: number;
    totalItemsReturned?: number;
}

export default function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = (await orderAPI.getById(orderId!)) as any;
            setOrder(response.data?.order || response.order);
        } catch (error: any) {
            console.error('Failed to fetch order details:', error);
            toast.error('Failed to load order details');
            navigate('/user/orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-500',
            accepted: 'bg-blue-500',
            picked_up: 'bg-indigo-500',
            in_progress: 'bg-purple-500',
            ready: 'bg-green-500',
            out_for_delivery: 'bg-cyan-500',
            delivered: 'bg-emerald-500',
            cancelled: 'bg-red-500',
        };
        return colors[status] || 'bg-gray-500';
    };

    const getStatusLabel = (status: string) => {
        return status.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => navigate('/user/orders')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                </Button>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
                        <p className="text-gray-600 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <Badge className={`text-base px-4 py-1 ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Status Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Order Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.statusHistory?.slice().reverse().map((history: any, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                                {index !== order.statusHistory.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gray-200 my-1" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{getStatusLabel(history.status)}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(history.timestamp).toLocaleString('en-IN')}
                                                </p>
                                                {history.notes && (
                                                    <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Photos Section */}
                        {(order.pickupPhotos?.length || 0) > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <ShoppingBag className="h-5 w-5" />
                                        Pickup Photos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {order.totalItemsPickedUp} items collected by vendor
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {order.pickupPhotos?.map((photo, index) => (
                                            <a
                                                key={index}
                                                href={photo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block aspect-square rounded-lg overflow-hidden border hover:opacity-90 transition-opacity"
                                            >
                                                <img
                                                    src={photo}
                                                    alt={`Pickup item ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {(order.deliveryPhotos?.length || 0) > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Truck className="h-5 w-5" />
                                        Delivery Photos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {order.totalItemsReturned} items returned by vendor
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {order.deliveryPhotos?.map((photo, index) => (
                                            <a
                                                key={index}
                                                href={photo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block aspect-square rounded-lg overflow-hidden border hover:opacity-90 transition-opacity"
                                            >
                                                <img
                                                    src={photo}
                                                    alt={`Delivery item ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Items List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order Items
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {order.items && order.items.length > 0 ? (
                                    <div className="space-y-4">
                                        {order.items.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                                                <div>
                                                    <p className="font-medium">{item.itemType || item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium">₹{item.totalPrice}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">
                                        Items will be listed after pickup
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Vendor Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Vendor Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium text-lg">{order.vendor?.businessName}</p>
                                <p className="text-gray-600 mt-1">{order.vendor?.phone}</p>
                            </CardContent>
                        </Card>

                        {/* Addresses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Locations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4" />
                                        <span className="font-medium">Pickup Address</span>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-6">
                                        {order.pickupAddress?.fullAddress}<br />
                                        {order.pickupAddress?.city}, {order.pickupAddress?.state} - {order.pickupAddress?.pincode}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 pl-6">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(order.pickupDate).toLocaleDateString()}</span>
                                        <Clock className="h-3 w-3 ml-2" />
                                        <span>{order.pickupTimeSlot}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4" />
                                        <span className="font-medium">Delivery Address</span>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-6">
                                        {order.deliveryAddress?.fullAddress}<br />
                                        {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Payment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₹{order.subtotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (18%)</span>
                                    <span>₹{order.tax?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{order.totalAmount?.toFixed(2)}</span>
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CreditCard className="h-4 w-4" />
                                        <span className="capitalize">{order.paymentMethod} Payment</span>
                                        <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'outline'} className="ml-auto">
                                            {order.paymentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
