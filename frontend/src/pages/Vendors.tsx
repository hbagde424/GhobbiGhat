import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { MapPin, Star, Clock, Phone, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { vendorAPI, Vendor } from "@/services/vendor.service";
import { toast } from "sonner";

const Vendors = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rawResponse, setRawResponse] = useState<any>(null);

  const searchVendors = async (searchPincode?: string) => {
    setLoading(true);
    try {
      const response = await vendorAPI.search({
        pincode: searchPincode || undefined,
        page,
        limit: 10,
      });
      // support both shapes and keep raw response for dev debugging
      const vendorsList = (response as any).data?.vendors ?? (response as any).vendors ?? [];
      setVendors(vendorsList);
      if (import.meta.env.DEV) setRawResponse(response);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchVendors();
  }, [page]);

  const handleSearch = () => {
    if (location) {
      searchVendors(location);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Find Laundry Services Near You</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover trusted vendors in your area
          </p>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your pincode or area"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {/* Vendor Cards */}
        {import.meta.env.DEV && rawResponse && (
          <div className="mb-6 p-4 bg-white border rounded text-sm text-gray-600">
            <div className="font-medium mb-2">[DEV] Vendors API response:</div>
            <div className="mb-2">Count: {((rawResponse as any).data?.vendors ?? (rawResponse as any).vendors ?? []).length}</div>
            <pre className="max-h-40 overflow-auto text-xs">{JSON.stringify(rawResponse, null, 2)}</pre>
          </div>
        )}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Loading vendors...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {vendors.map((vendor) => (
              <Card
                key={vendor._id}
                className="hover:shadow-elevated transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/vendor/${vendor._id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{vendor.businessName}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium text-foreground">{vendor.rating.toFixed(1)}</span>
                          <span>({vendor.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vendor.description && (
                    <p className="text-sm text-muted-foreground">{vendor.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service: any, idx: number) => (
                      <Badge key={idx} variant="outline">
                        <Package className="h-3 w-3 mr-1" />
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{vendor.businessPhone}</span>
                      </div>
                    </div>
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${vendor._id}`);
                    }}>
                      Schedule Pickup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>)}

        {/* Empty State */}
        {vendors.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No vendors found</h3>
            <p className="text-muted-foreground">
              Try searching in a different area or adjust your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
