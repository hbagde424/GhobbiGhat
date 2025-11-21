import { useEffect, useState } from 'react';
import { Package, Check, X, Clock, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { orderAPI } from '@/services/order.service';
import { toast } from 'sonner';

interface Order {
  _id: string;
  orderNumber: string;
  user: {
    name: string;
    phone: string;
  };
  status: string;
  totalAmount: number;
  vendorEarnings: number;
  pickupDate: string;
  deliveryDate?: string;
  pickupAddress: any;
  deliveryAddress: any;
  items: any[];
  createdAt: string;
}

export default function VendorOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = (await orderAPI.getVendorOrders({})) as any;
      const list = response.data?.orders ?? response.orders ?? [];
      setOrders(list);
    } catch (error: any) {
      console.error('Failed to fetch orders:', error);
      toast.error(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusTab !== 'all') {
      if (statusTab === 'active') {
        filtered = filtered.filter(order =>
          !['delivered', 'cancelled'].includes(order.status)
        );
      } else if (statusTab === 'completed') {
        filtered = filtered.filter(order => order.status === 'delivered');
      } else if (statusTab === 'cancelled') {
        filtered = filtered.filter(order => order.status === 'cancelled');
      }
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated successfully');
      fetchOrders();
      setShowOrderDialog(false);
    } catch (error: any) {
      console.error('Failed to update status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    await handleStatusUpdate(orderId, 'accepted');
  };

  const handleRejectOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to reject this order?')) return;
    await handleStatusUpdate(orderId, 'cancelled');
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDialog(true);
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

  const getNextStatus = (currentStatus: string): string | null => {
    const flow: Record<string, string> = {
      pending: 'accepted',
      accepted: 'picked_up',
      picked_up: 'in_progress',
      in_progress: 'ready',
      ready: 'out_for_delivery',
      out_for_delivery: 'delivered',
    };
    return flow[currentStatus] || null;
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage and track customer orders</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order number or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={statusTab} onValueChange={setStatusTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={statusTab}>
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search' : 'Orders will appear here once customers place them'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {order.orderNumber}
                            </h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div>Customer: <span className="font-medium">{order.user?.name}</span></div>
                            <div>Phone: <span className="font-medium">{order.user?.phone}</span></div>
                            <div>
                              Pickup: {new Date(order.pickupDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                            <div>Items: {order.items?.length || 0}</div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewOrderDetails(order)}
                            >
                              View Details
                            </Button>

                            {order.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptOrder(order._id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectOrder(order._id)}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                              </>
                            )}

                            {getNextStatus(order.status) && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(order._id, getNextStatus(order.status)!)}
                              >
                                Update to {getStatusLabel(getNextStatus(order.status)!)}
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{order.totalAmount.toFixed(2)}
                          </div>
                          <div className="text-sm text-green-600 mt-1">
                            You earn: ₹{order.vendorEarnings.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
              <DialogDescription>
                Complete order information
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="text-sm space-y-1">
                    <p>Name: {selectedOrder.user?.name}</p>
                    <p>Phone: {selectedOrder.user?.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Pickup Address</h4>
                  <p className="text-sm">{selectedOrder.pickupAddress?.fullAddress}</p>
                  <p className="text-sm">{selectedOrder.pickupAddress?.city}, {selectedOrder.pickupAddress?.state} - {selectedOrder.pickupAddress?.pincode}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Delivery Address</h4>
                  <p className="text-sm">{selectedOrder.deliveryAddress?.fullAddress}</p>
                  <p className="text-sm">{selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state} - {selectedOrder.deliveryAddress?.pincode}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{item.name || `Item ${index + 1}`}</span>
                        <span>Qty: {item.quantity || 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold">₹{selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span className="font-semibold">Your Earnings:</span>
                  <span className="text-lg font-bold">₹{selectedOrder.vendorEarnings.toFixed(2)}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
