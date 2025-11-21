import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store, Upload, MapPin, Clock, IndianRupee } from 'lucide-react';
import { vendorAPI } from '@/services/vendor.service';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

export default function VendorSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Add documents if uploaded
      if (documents) {
        Array.from(documents).forEach((file) => {
          formData.append('documents', file);
        });
      }

      await vendorAPI.register(formData);
      toast.success('Vendor profile created successfully! Awaiting approval.');
      navigate('/vendor/dashboard');
    } catch (error: any) {
      console.error('Failed to create vendor profile:', error);
      toast.error(error.response?.data?.message || 'Failed to create vendor profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Vendor Profile</h1>
          <p className="text-gray-600 mt-2">Set up your laundry business to start receiving orders</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your laundry business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="businessName"
                      name="businessName"
                      className="pl-10"
                      placeholder="ABC Laundry Services"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email *</Label>
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    placeholder="business@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone *</Label>
                  <Input
                    id="businessPhone"
                    name="businessPhone"
                    type="tel"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell customers about your services, experience, and what makes you unique..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Location</CardTitle>
              <CardDescription>Where is your business located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    className="pl-10"
                    placeholder="Shop No., Building Name, Street"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" placeholder="Mumbai" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" name="state" placeholder="Maharashtra" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="400001"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceAreas">Service Area Pincodes *</Label>
                <Input
                  id="serviceAreas"
                  name="serviceAreas"
                  placeholder="400001, 400002, 400003"
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter comma-separated pincodes where you provide services
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>When are you available?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openTime">Opening Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="openTime"
                      name="openTime"
                      type="time"
                      className="pl-10"
                      defaultValue="09:00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closeTime">Closing Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="closeTime"
                      name="closeTime"
                      type="time"
                      className="pl-10"
                      defaultValue="21:00"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Documents & Verification</CardTitle>
              <CardDescription>Upload required documents for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="governmentIdType">Government ID Type *</Label>
                  <select
                    id="governmentIdType"
                    name="governmentIdType"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select ID Type</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="gst">GST Certificate</option>
                    <option value="trade_license">Trade License</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="governmentIdNumber">Government ID Number *</Label>
                  <Input
                    id="governmentIdNumber"
                    name="governmentIdNumber"
                    placeholder="Enter ID Number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Upload ID Document *</Label>
                <div className="relative">
                  <Upload className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="pl-10"
                    onChange={(e) => setDocuments(e.target.files)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Upload ID proof, business registration, or other relevant documents (Required)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
              <CardDescription>Add your bank details to receive payments *</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    name="bankDetails.accountHolderName"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="accountNumber"
                      name="bankDetails.accountNumber"
                      className="pl-10"
                      placeholder="1234567890"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    name="bankDetails.ifscCode"
                    placeholder="SBIN0001234"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    name="bankDetails.bankName"
                    placeholder="State Bank of India"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Creating Profile...' : 'Complete Setup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
