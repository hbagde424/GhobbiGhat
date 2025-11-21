import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/Navbar";
import { Calendar, Clock, MapPin, CreditCard, Package, ArrowLeft, Loader2 } from "lucide-react";
import { vendorAPI, Vendor } from "@/services/vendor.service";
import { orderAPI } from "@/services/order.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    unit: string;
    estimatedTime: string;
}

const CreateOrder = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [selectedService, setSelectedService] = useState("");
    const [pickupAddress, setPickupAddress] = useState({
        fullAddress: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [sameAsPickup, setSameAsPickup] = useState(true);
    const [deliveryAddress, setDeliveryAddress] = useState({
        fullAddress: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTimeSlot, setPickupTimeSlot] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

    // Time slots
    const timeSlots = [
        "9:00 AM - 12:00 PM",
        "12:00 PM - 3:00 PM",
        "3:00 PM - 6:00 PM",
        "6:00 PM - 9:00 PM",
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login to place an order");
            navigate("/auth");
            return;
        }

        if (user?.role !== "user") {
            toast.error("Only users can place orders");
            navigate("/");
            return;
        }

        fetchVendorDetails();
        fetchServices();
    }, [vendorId, isAuthenticated, user]);

    const fetchVendorDetails = async () => {
        try {
            const response = await vendorAPI.getById(vendorId!);
            setVendor(response.data.vendor);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch vendor details");
            navigate("/vendors");
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
            const data = await response.json();
            setServices(data.data?.services || []);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedService) {
            toast.error("Please select a service");
            return;
        }

        if (!pickupDate || !pickupTimeSlot) {
            toast.error("Please select pickup date and time");
            return;
        }

        setSubmitting(true);

        try {
            const orderData = {
                vendorId: vendorId!,
                serviceType: selectedService,
                pickupAddress,
                deliveryAddress: sameAsPickup ? pickupAddress : deliveryAddress,
                pickupDate,
                pickupTimeSlot,
                specialInstructions,
                paymentMethod,
            };

            const response = await orderAPI.create(orderData);
            toast.success("Order placed successfully!");
            navigate(`/user/orders`);
        } catch (error: any) {
            toast.error(error.message || "Failed to create order");
        } finally {
            setSubmitting(false);
        }
    };

    const selectedServiceDetails = services.find(s => s._id === selectedService);
    const subtotal = selectedServiceDetails?.basePrice || 0;
    const tax = subtotal * 0.18;
    const deliveryCharge = 0;
    const total = subtotal + tax + deliveryCharge;

    // Get minimum date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate("/vendors")}
                    className="mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Vendors
                </Button>

                {/* Vendor Info */}
                {vendor && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-2xl">{vendor.businessName}</CardTitle>
                            <CardDescription>
                                {vendor.city} • ⭐ {vendor.rating.toFixed(1)} ({vendor.totalReviews} reviews)
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Service Selection */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Select Service
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                                        <div className="space-y-3">
                                            {services.map((service) => (
                                                <div
                                                    key={service._id}
                                                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedService === service._id
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => setSelectedService(service._id)}
                                                >
                                                    <RadioGroupItem value={service._id} id={service._id} />
                                                    <div className="flex-1">
                                                        <Label htmlFor={service._id} className="cursor-pointer">
                                                            <div className="font-semibold">{service.name}</div>
                                                            <div className="text-sm text-muted-foreground">{service.description}</div>
                                                            <div className="text-sm mt-1">
                                                                ₹{service.basePrice}/{service.unit} • {service.estimatedTime}
                                                            </div>
                                                        </Label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* Pickup Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Pickup Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="fullAddress">Full Address *</Label>
                                        <Textarea
                                            id="fullAddress"
                                            placeholder="House/Flat No., Street, Area"
                                            value={pickupAddress.fullAddress}
                                            onChange={(e) => setPickupAddress({ ...pickupAddress, fullAddress: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="landmark">Landmark</Label>
                                        <Input
                                            id="landmark"
                                            placeholder="Nearby landmark"
                                            value={pickupAddress.landmark}
                                            onChange={(e) => setPickupAddress({ ...pickupAddress, landmark: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                placeholder="City"
                                                value={pickupAddress.city}
                                                onChange={(e) => setPickupAddress({ ...pickupAddress, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State *</Label>
                                            <Input
                                                id="state"
                                                placeholder="State"
                                                value={pickupAddress.state}
                                                onChange={(e) => setPickupAddress({ ...pickupAddress, state: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="pincode">Pincode *</Label>
                                        <Input
                                            id="pincode"
                                            placeholder="Pincode"
                                            value={pickupAddress.pincode}
                                            onChange={(e) => setPickupAddress({ ...pickupAddress, pincode: e.target.value })}
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Delivery Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Delivery Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="sameAsPickup"
                                            checked={sameAsPickup}
                                            onCheckedChange={(checked) => setSameAsPickup(checked as boolean)}
                                        />
                                        <Label htmlFor="sameAsPickup" className="cursor-pointer">
                                            Same as pickup address
                                        </Label>
                                    </div>

                                    {!sameAsPickup && (
                                        <>
                                            <div>
                                                <Label htmlFor="deliveryFullAddress">Full Address *</Label>
                                                <Textarea
                                                    id="deliveryFullAddress"
                                                    placeholder="House/Flat No., Street, Area"
                                                    value={deliveryAddress.fullAddress}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullAddress: e.target.value })}
                                                    required={!sameAsPickup}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="deliveryLandmark">Landmark</Label>
                                                <Input
                                                    id="deliveryLandmark"
                                                    placeholder="Nearby landmark"
                                                    value={deliveryAddress.landmark}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, landmark: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="deliveryCity">City *</Label>
                                                    <Input
                                                        id="deliveryCity"
                                                        placeholder="City"
                                                        value={deliveryAddress.city}
                                                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                                                        required={!sameAsPickup}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="deliveryState">State *</Label>
                                                    <Input
                                                        id="deliveryState"
                                                        placeholder="State"
                                                        value={deliveryAddress.state}
                                                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                                                        required={!sameAsPickup}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="deliveryPincode">Pincode *</Label>
                                                <Input
                                                    id="deliveryPincode"
                                                    placeholder="Pincode"
                                                    value={deliveryAddress.pincode}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                                                    required={!sameAsPickup}
                                                    maxLength={6}
                                                />
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Pickup Schedule */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Schedule Pickup
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="pickupDate">Pickup Date *</Label>
                                        <Input
                                            id="pickupDate"
                                            type="date"
                                            min={minDate}
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Pickup Time Slot *</Label>
                                        <RadioGroup value={pickupTimeSlot} onValueChange={setPickupTimeSlot}>
                                            <div className="grid grid-cols-2 gap-3 mt-2">
                                                {timeSlots.map((slot) => (
                                                    <div
                                                        key={slot}
                                                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${pickupTimeSlot === slot
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border hover:border-primary/50"
                                                            }`}
                                                        onClick={() => setPickupTimeSlot(slot)}
                                                    >
                                                        <RadioGroupItem value={slot} id={slot} />
                                                        <Label htmlFor={slot} className="cursor-pointer flex items-center gap-2">
                                                            <Clock className="h-4 w-4" />
                                                            {slot}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Instructions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Special Instructions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Any special care instructions or notes for the vendor..."
                                        value={specialInstructions}
                                        onChange={(e) => setSpecialInstructions(e.target.value)}
                                        rows={3}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {selectedServiceDetails && (
                                        <>
                                            <div className="space-y-2 pb-4 border-b">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Service</span>
                                                    <span className="font-medium">{selectedServiceDetails.name}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Base Price</span>
                                                    <span>₹{subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Tax (18%)</span>
                                                    <span>₹{tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Delivery Charge</span>
                                                    <span className="text-green-600">FREE</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span>₹{total.toFixed(2)}</span>
                                            </div>
                                        </>
                                    )}

                                    {/* Payment Method */}
                                    <div className="pt-4 border-t">
                                        <Label className="flex items-center gap-2 mb-3">
                                            <CreditCard className="h-4 w-4" />
                                            Payment Method
                                        </Label>
                                        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "cod" | "online")}>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:border-primary">
                                                    <RadioGroupItem value="cod" id="cod" />
                                                    <Label htmlFor="cod" className="cursor-pointer flex-1">Cash on Delivery</Label>
                                                </div>
                                                <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:border-primary">
                                                    <RadioGroupItem value="online" id="online" />
                                                    <Label htmlFor="online" className="cursor-pointer flex-1">Online Payment</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={submitting || !selectedService}
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center">
                                        By placing this order, you agree to our terms and conditions
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;
