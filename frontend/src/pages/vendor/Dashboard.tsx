import { useEffect, useState } from 'react';
import { TrendingUp, Package, IndianRupee, Star, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { vendorAPI } from '@/services/vendor.service';
import { orderAPI } from '@/services/order.service';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalEarnings: number;
  pendingEarnings: number;
  rating: number;
  totalReviews: number;
}

interface RecentOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  totalAmount: number;
  vendorEarnings: number;
  createdAt: string;
}

export default function VendorDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    rating: 0,
    totalReviews: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch vendor dashboard
      const dashboardResponse = (await vendorAPI.getDashboard()) as any;
      // backend returns { success: true, data: { stats } }
      setStats(dashboardResponse.data?.stats ?? dashboardResponse.stats ?? ({} as any));

      // Fetch recent orders
      const ordersResponse = (await orderAPI.getVendorOrders({ limit: 5 })) as any;
      const orders = ordersResponse.data?.orders ?? ordersResponse.orders ?? [];

      const recent = orders.map((order: any) => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        customerName: order.userId?.name || 'Unknown',
        status: order.status,
        totalAmount: order.totalAmount,
        vendorEarnings: order.vendorEarning || 0,
        createdAt: order.createdAt,
      }));

      setRecentOrders(recent);
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error(error.response?.data?.message || 'Failed to load dashboard');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your laundry business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Orders
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Earnings
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{stats.totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ₹{stats.pendingEarnings.toFixed(2)} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.rating.toFixed(1)} ⭐
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.totalReviews} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.totalOrders > 0
                  ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.completedOrders} of {stats.totalOrders} orders completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Average Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                ₹{stats.totalOrders > 0
                  ? (stats.totalEarnings / stats.totalOrders).toFixed(2)
                  : 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">Per order</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {stats.rating >= 4.5 ? 'Excellent' : stats.rating >= 4 ? 'Good' : stats.rating >= 3 ? 'Average' : 'Needs Improvement'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on {stats.totalReviews} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your vendor account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/vendor/orders">
                <Button className="w-full" size="lg">
                  <Package className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              </Link>
              <Link to="/vendor/profile">
                <Button variant="outline" className="w-full" size="lg">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
              <Link to="/vendor/earnings">
                <Button variant="outline" className="w-full" size="lg">
                  <IndianRupee className="mr-2 h-4 w-4" />
                  View Earnings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from customers</CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Orders will appear here once customers place them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order._id}
                    to={`/vendor/orders/${order._id}`}
                    className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div>Customer: {order.customerName}</div>
                          <div>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600">
                          You earn: ₹{order.vendorEarnings.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link to="/vendor/orders">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
