import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { MapPin, Star, Clock, Phone, Package, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { vendorAPI, Vendor } from "@/services/vendor.service";
import { toast } from "sonner";

// Vendor Card Component with Image Gallery
const VendorCard = ({ vendor, navigate }: { vendor: Vendor; navigate: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = vendor.gallery && vendor.gallery.length > 0 ? vendor.gallery : [];
  const currentImage = images[currentImageIndex];

  // Debug logging
  useEffect(() => {
    console.log(`Vendor: ${vendor.businessName}`, {
      hasGallery: !!vendor.gallery,
      galleryLength: vendor.gallery?.length || 0,
      gallery: vendor.gallery,
      currentImage,
    });
  }, [vendor, currentImage]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full hover:scale-105 transform"
      onClick={() => navigate(`/vendor/${vendor._id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden group">
        {currentImage && !imageError ? (
          <>
            <img
              src={currentImage}
              alt={vendor.businessName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => {
                console.error('Image failed to load:', currentImage);
                setImageError(true);
              }}
              crossOrigin="anonymous"
              loading="lazy"
            />
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No image available</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg line-clamp-2">{vendor.businessName}</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({vendor.totalReviews})</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-3 pb-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{vendor.city}</span>
        </div>

        {/* Description */}
        {vendor.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
        )}

        {/* Services */}
        {vendor.services && vendor.services.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {vendor.services.slice(0, 2).map((service: any, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {service.name}
              </Badge>
            ))}
            {vendor.services.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.services.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
          <Phone className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs">{vendor.businessPhone}</span>
        </div>
      </CardContent>

      {/* Button */}
      <div className="px-6 pb-4">
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/order/${vendor._id}`);
          }}
        >
          Schedule Pickup
        </Button>
      </div>
    </Card>
  );
};

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
       
          {/* // <div className="mb-6 p-4 bg-white border rounded text-sm text-gray-600">
          //   <div className="font-medium mb-2">[DEV] Vendors API response:</div>
          //   <div className="mb-2">Count: {((rawResponse as any).data?.vendors ?? (rawResponse as any).vendors ?? []).length}</div>
          //   <pre className="max-h-40 overflow-auto text-xs">{JSON.stringify(rawResponse, null, 2)}</pre>
          // </div> */}
        
        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Loading vendors...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} navigate={navigate} />
            ))}
          </div>
        )}

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
