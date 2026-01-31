import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { api } from "@/lib/api";
import { useEffect } from "react";

import { format } from "date-fns";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  UtensilsCrossed,
  Coffee,
  Tv,
  Wind,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Users,
  Share2,
  Heart,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
 const [hotel, setHotel] = useState<any>(null);

useEffect(() => {
  api.get(`/hotels/${id}`)
    .then(res => setHotel(res.data))
    .catch(() => navigate("/hotels"));
}, [id]);


  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (!hotel) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <Button onClick={() => navigate("/hotels")}>Browse Hotels</Button>
        </div>
      </MainLayout>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi")) return <Wifi className="h-5 w-5" />;
    if (lower.includes("parking") || lower.includes("car")) return <Car className="h-5 w-5" />;
    if (lower.includes("restaurant") || lower.includes("food")) return <UtensilsCrossed className="h-5 w-5" />;
    if (lower.includes("breakfast") || lower.includes("coffee")) return <Coffee className="h-5 w-5" />;
    if (lower.includes("tv")) return <Tv className="h-5 w-5" />;
    if (lower.includes("ac") || lower.includes("air")) return <Wind className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  const handleBookRoom = (roomId: string) => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    navigate(
      `/booking?hotelId=${hotel.id}&roomId=${roomId}&checkIn=${format(checkIn, "yyyy-MM-dd")}&checkOut=${format(checkOut, "yyyy-MM-dd")}`
    );
  };

  const discount = hotel.originalPrice
    ? Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)
    : 0;

  return (
    <MainLayout>
      <div className="container py-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden h-64 md:h-96">
            <img
              src={hotel.images[currentImage]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? hotel.images.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === hotel.images.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-2">
            {hotel.images.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "rounded-lg overflow-hidden h-44 border-2 transition-all",
                  currentImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {hotel.location}, {hotel.city}, {hotel.state}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-semibold">
                  <Star className="h-4 w-4 fill-current" />
                  {hotel.rating}
                </div>
                <span className="text-muted-foreground">
                  {hotel.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this hotel</h2>
              <p className="text-muted-foreground leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
                  >
                    <div className="text-primary">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Your Room</h2>
              <div className="space-y-4">
                {hotel.roomTypes.map((room) => (
                  <Card
                    key={room.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedRoom === room.id
                        ? "ring-2 ring-primary"
                        : "hover:shadow-md"
                    )}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {room.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {room.capacity} guests
                            </span>
                            <span>• {room.bedType}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((a) => (
                              <Badge key={a} variant="secondary" className="text-xs">
                                {a}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          {room.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through block">
                              ₹{room.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-2xl font-bold">
                            ₹{room.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /night
                          </span>
                          <div className="mt-2">
                            <span className="text-sm text-success">
                              {room.available} rooms left
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-center pb-4 border-b">
                  {hotel.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through mr-2">
                      ₹{hotel.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold">
                    ₹{hotel.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/night</span>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto py-3",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Check-in
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {checkIn
                              ? format(checkIn, "dd MMM")
                              : "Select"}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto py-3",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Check-out
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {checkOut
                              ? format(checkOut, "dd MMM")
                              : "Select"}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) =>
                          date < new Date() ||
                          (checkIn ? date <= checkIn : false)
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Book Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    selectedRoom
                      ? handleBookRoom(selectedRoom)
                      : alert("Please select a room type")
                  }
                >
                  {selectedRoom ? "Continue to Booking" : "Select a Room"}
                </Button>

                {/* Info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Free cancellation up to 24 hours before check-in</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
