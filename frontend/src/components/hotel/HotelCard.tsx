import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, UtensilsCrossed } from "lucide-react";
import { Hotel } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: Hotel;
  variant?: "grid" | "list";
}

export function HotelCard({ hotel, variant = "grid" }: HotelCardProps) {
  const discount = hotel.originalPrice
    ? Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)
    : 0;

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi")) return <Wifi className="h-3 w-3" />;
    if (amenity.toLowerCase().includes("parking") || amenity.toLowerCase().includes("car"))
      return <Car className="h-3 w-3" />;
    if (amenity.toLowerCase().includes("restaurant") || amenity.toLowerCase().includes("food"))
      return <UtensilsCrossed className="h-3 w-3" />;
    return null;
  };

  if (variant === "list") {
    return (
      <Card className="group overflow-hidden hover-lift">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-72 h-48 md:h-auto shrink-0">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-4 md:p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium shrink-0">
                    <Star className="h-3 w-3 fill-current" />
                    {hotel.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="h-3 w-3" />
                  {hotel.location}, {hotel.city}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  {hotel.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through mr-2">
                      ₹{hotel.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-foreground">
                    ₹{hotel.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/night</span>
                </div>
                <Link to={`/hotel/${hotel.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover-lift">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            {discount}% OFF
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium">
          <Star className="h-3 w-3 fill-primary text-primary" />
          {hotel.rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3 w-3" />
          {hotel.location}, {hotel.city}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <div>
            {hotel.originalPrice && (
              <span className="text-sm text-muted-foreground line-through block">
                ₹{hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-bold text-foreground">
              ₹{hotel.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <Link to={`/hotel/${hotel.id}`}>
            <Button size="sm">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
