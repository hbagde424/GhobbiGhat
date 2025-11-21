import { useEffect, useState } from 'react';
import { IndianRupee, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { vendorAPI } from '@/services/vendor.service';
import { orderAPI } from '@/services/order.service';
import { toast } from 'sonner';

interface EarningsData {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  thisMonthEarnings: number;
}

interface Transaction {
  _id: string;
  orderNumber: string;
  amount: number;
  commission: number;
  vendorEarnings: number;
  status: string;
  date: string;
}

export default function VendorEarnings() {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    thisMonthEarnings: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterPeriod, setFilterPeriod] = useState('all');

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);

      // Fetch vendor dashboard for earnings
      const dashboardResponse = (await vendorAPI.getDashboard()) as any;
      const stats = dashboardResponse.data?.stats ?? dashboardResponse.stats ?? {};

      // Fetch all orders for transaction history
      const ordersResponse = (await orderAPI.getVendorOrders({})) as any;
      const orders = ordersResponse.data?.orders ?? ordersResponse.orders ?? [];

      // Calculate earnings
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const earningsData = {
        totalEarnings: stats.totalEarnings || 0,
        pendingEarnings: stats.pendingEarnings || 0,
        paidEarnings: (stats.totalEarnings || 0) - (stats.pendingEarnings || 0),
        thisMonthEarnings: orders
          .filter((order: any) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= thisMonthStart && order.status === 'delivered';
          })
          .reduce((sum: number, order: any) => sum + (order.vendorEarning || 0), 0),
      };

      setEarnings(earningsData);

      // Format transactions
      const transactionList = orders
        .filter((order: any) => (order.vendorEarning || 0) > 0)
        .map((order: any) => ({
          _id: order._id,
          orderNumber: order.orderNumber,
          amount: order.totalAmount,
          commission: order.commissionAmount || 0,
          vendorEarnings: order.vendorEarning || 0,
          status: order.status,
          date: order.createdAt,
        }))
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setTransactions(transactionList);
    } catch (error: any) {
      console.error('Failed to fetch earnings data:', error);
      toast.error(error.response?.data?.message || 'Failed to load earnings');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterPeriod === 'all') return true;

    const transactionDate = new Date(transaction.date);
    const now = new Date();

    if (filterPeriod === 'today') {
      return transactionDate.toDateString() === now.toDateString();
    } else if (filterPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return transactionDate >= weekAgo;
    } else if (filterPeriod === 'month') {
      return transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear();
    }

    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === 'delivered') return 'bg-green-500';
    if (status === 'cancelled') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'delivered') return 'Paid';
    if (status === 'cancelled') return 'Cancelled';
    return 'Pending';
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
          <h1 className="text-3xl font-bold text-gray-900">Earnings & Payouts</h1>
          <p className="text-gray-600 mt-2">Track your earnings and transaction history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Earnings
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{earnings.totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Earnings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ₹{earnings.pendingEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">From active orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Paid Earnings
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₹{earnings.paidEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Successfully paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₹{earnings.thisMonthEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Current month earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Bank Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bank Account Details</CardTitle>
            <CardDescription>
              Update your bank account to receive payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Configure your bank account in vendor profile settings
              </div>
              <Button variant="outline">
                Update Bank Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your earnings from completed orders</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <IndianRupee className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Transactions will appear here once you complete orders
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {transaction.orderNumber}
                        </h4>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusLabel(transaction.status)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        +₹{transaction.vendorEarnings.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Order: ₹{transaction.amount.toFixed(2)} | Commission: ₹{transaction.commission.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
