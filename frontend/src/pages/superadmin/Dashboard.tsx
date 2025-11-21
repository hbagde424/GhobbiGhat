import { useEffect, useState } from 'react';
import { Users, Store, Package, IndianRupee, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { adminAPI, AdminStats } from '@/services/admin.service';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SuperAdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 0,
        totalVendors: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingVendors: 0,
        activeOrders: 0,
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getDashboardStats();
            setStats(response.stats);
        } catch (error: any) {
            console.error('Failed to fetch dashboard data:', error);
            toast.error(error.response?.data?.message || 'Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground mt-1">Registered customers</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Vendors
                        </CardTitle>
                        <Store className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{stats.totalVendors}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.pendingVendors > 0 && `${stats.pendingVendors} pending approval`}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Orders
                        </CardTitle>
                        <Package className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.activeOrders} active orders
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <IndianRupee className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            ₹{stats.totalRevenue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Platform earnings</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Vendors
                        </CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.pendingVendors}</div>
                        <p className="text-xs text-muted-foreground mt-1">Need approval</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Orders
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-cyan-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-cyan-600">{stats.activeOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">Currently processing</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Super Admin Actions</CardTitle>
                    <CardDescription>Manage platform operations and administrators</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link to="/superadmin/admins">
                            <Button className="w-full" size="lg" variant="outline">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Manage Admins
                            </Button>
                        </Link>
                        <Link to="/superadmin/users">
                            <Button className="w-full" size="lg" variant="outline">
                                <Users className="mr-2 h-4 w-4" />
                                Manage Users
                            </Button>
                        </Link>
                        <Link to="/superadmin/vendors">
                            <Button className="w-full" size="lg" variant="outline">
                                <Store className="mr-2 h-4 w-4" />
                                Manage Vendors
                            </Button>
                        </Link>
                        <Link to="/superadmin/orders">
                            <Button className="w-full" size="lg" variant="outline">
                                <Package className="mr-2 h-4 w-4" />
                                View All Orders
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Alerts */}
            {stats.pendingVendors > 0 && (
                <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                    <CardHeader>
                        <CardTitle className="text-orange-900 dark:text-orange-100">Pending Approvals</CardTitle>
                        <CardDescription className="text-orange-700 dark:text-orange-300">
                            You have {stats.pendingVendors} vendor{stats.pendingVendors > 1 ? 's' : ''} waiting for approval
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/superadmin/vendors?status=pending">
                            <Button variant="default" className="bg-orange-600 hover:bg-orange-700">
                                Review Vendors
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
