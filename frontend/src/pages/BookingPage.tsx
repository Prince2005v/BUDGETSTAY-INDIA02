import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { hotels } from "@/lib/data";
import { format, differenceInDays } from "date-fns";
import { MapPin, CalendarDays, Users, Check, Shield, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const hotelId = searchParams.get("hotelId");
  const roomId = searchParams.get("roomId");
  const checkInStr = searchParams.get("checkIn");
  const checkOutStr = searchParams.get("checkOut");

  const hotel = hotels.find((h) => h.id === hotelId);
  const room = hotel?.roomTypes.find((r) => r.id === roomId);

  const checkIn = checkInStr ? new Date(checkInStr) : new Date();
  const checkOut = checkOutStr ? new Date(checkOutStr) : new Date();
  const nights = differenceInDays(checkOut, checkIn) || 1;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!hotel || !room) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking information not found</h1>
          <Button onClick={() => navigate("/hotels")}>Browse Hotels</Button>
        </div>
      </MainLayout>
    );
  }

  const roomTotal = room.price * nights;
  const taxes = Math.round(roomTotal * 0.18);
  const serviceFee = 99;
  const grandTotal = roomTotal + taxes + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking at ${hotel.name} has been confirmed. Check your email for details.`,
      });
      navigate("/");
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Guest Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Input
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      placeholder="Any special requests for your stay?"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/200px-Razorpay_logo.svg.png"
                      alt="Razorpay"
                      className="h-6"
                    />
                    <span className="font-medium">Pay securely with Razorpay</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Credit Card, Debit Card, UPI, Net Banking, Wallets
                  </p>
                </div>

                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mt-0.5 text-success" />
                  <span>
                    Your payment is secured with 256-bit SSL encryption. We never
                    store your card details.
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : `Pay ₹${grandTotal.toLocaleString()}`}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Hotel Info */}
                <div className="flex gap-3">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {hotel.city}
                    </div>
                    <div className="text-sm font-medium text-primary mt-1">
                      {room.name}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Dates */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      Check-in
                    </div>
                    <span className="font-medium">
                      {format(checkIn, "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      Check-out
                    </div>
                    <span className="font-medium">
                      {format(checkOut, "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="text-center text-sm bg-secondary py-2 rounded">
                    {nights} {nights === 1 ? "Night" : "Nights"}
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ₹{room.price.toLocaleString()} x {nights} nights
                    </span>
                    <span>₹{roomTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes (18% GST)</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Cancellation Policy */}
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <Check className="h-4 w-4" />
                    Free Cancellation
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cancel up to 24 hours before check-in for a full refund
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
