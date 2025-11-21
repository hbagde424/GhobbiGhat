import { useEffect, useState } from 'react';
import { Store, Search, Check, X, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { adminAPI } from '@/services/admin.service';
import { toast } from 'sonner';

interface Vendor {
  _id: string;
  userId: {
    name: string;
    email: string;
    phone: string;
  };
  businessName: string;
  businessPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  serviceAreas: string[];
  governmentIdType: string;
  governmentIdNumber: string;
  approvalStatus: string;
  rejectionReason?: string;
  rating: number;
  totalOrders: number;
  totalEarnings: number;
  createdAt: string;
}

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [vendors, searchTerm, statusTab]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllVendors();
      setVendors(response.vendors || []);
    } catch (error: any) {
      console.error('Failed to fetch vendors:', error);
      toast.error(error.response?.data?.message || 'Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const filterVendors = () => {
    let filtered = [...vendors];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.userId?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusTab !== 'all') {
      filtered = filtered.filter(vendor => vendor.approvalStatus === statusTab);
    }

    setFilteredVendors(filtered);
  };

  const handleApprove = async (vendorId: string) => {
    try {
      await adminAPI.approveVendor(vendorId);
      toast.success('Vendor approved successfully');
      fetchVendors();
    } catch (error: any) {
      console.error('Failed to approve vendor:', error);
      toast.error(error.response?.data?.message || 'Failed to approve vendor');
    }
  };

  const handleReject = async () => {
    if (!selectedVendor || !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      await adminAPI.rejectVendor(selectedVendor._id, rejectionReason);
      toast.success('Vendor rejected');
      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedVendor(null);
      fetchVendors();
    } catch (error: any) {
      console.error('Failed to reject vendor:', error);
      toast.error(error.response?.data?.message || 'Failed to reject vendor');
    }
  };

  const openRejectDialog = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowRejectDialog(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      rejected: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
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
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600 mt-2">Approve and manage vendor accounts</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by business name, owner name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={statusTab} onValueChange={setStatusTab}>
          <TabsList>
            <TabsTrigger value="all">All Vendors</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {vendors.filter(v => v.approvalStatus === 'pending').length > 0 && (
                <Badge className="ml-2 bg-orange-500">
                  {vendors.filter(v => v.approvalStatus === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={statusTab} className="mt-6">
            {filteredVendors.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Store className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No vendors found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search' : 'No vendors in this category'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredVendors.map((vendor) => (
                  <Card key={vendor._id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {vendor.businessName}
                            </h3>
                            <Badge className={getStatusColor(vendor.approvalStatus)}>
                              {vendor.approvalStatus.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                            <div>Owner: <span className="font-medium">{vendor.userId?.name}</span></div>
                            <div>Email: <span className="font-medium">{vendor.userId?.email}</span></div>
                            <div>Phone: <span className="font-medium">{vendor.businessPhone}</span></div>
                            <div>Location: <span className="font-medium">{vendor.city}, {vendor.state}</span></div>
                            <div>Service Areas: <span className="font-medium">{vendor.serviceAreas?.join(', ')}</span></div>
                            <div>ID Type: <span className="font-medium">{vendor.governmentIdType.toUpperCase()}</span></div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div>⭐ {vendor.rating.toFixed(1)} Rating</div>
                            <div>📦 {vendor.totalOrders} Orders</div>
                            <div>💰 ₹{vendor.totalEarnings.toFixed(2)} Earnings</div>
                          </div>

                          {vendor.rejectionReason && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                              <p className="text-sm text-red-800">
                                <strong>Rejection Reason:</strong> {vendor.rejectionReason}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          {vendor.approvalStatus === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(vendor._id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openRejectDialog(vendor)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            </>
                          )}
                          <div className="text-xs text-gray-500 text-right">
                            Registered: {new Date(vendor.createdAt).toLocaleDateString('en-IN')}
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

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Vendor</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting {selectedVendor?.businessName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter detailed reason for rejection..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  Reject Vendor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
