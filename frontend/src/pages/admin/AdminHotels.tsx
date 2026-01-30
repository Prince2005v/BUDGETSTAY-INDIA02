import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { hotels } from "@/lib/data";
import { Search, Check, X, Eye, Star, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminHotels() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const { toast } = useToast();

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "approved") return matchesSearch && hotel.approved;
    if (filter === "pending") return matchesSearch && !hotel.approved;
    return matchesSearch;
  });

  const handleApprove = (hotelId: string) => {
    toast({
      title: "Hotel Approved",
      description: "The hotel listing is now live on the platform.",
    });
  };

  const handleReject = (hotelId: string) => {
    toast({
      title: "Hotel Rejected",
      description: "The partner has been notified about the rejection.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Hotels</h2>
        <p className="text-muted-foreground">
          Review and manage all hotel listings
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({hotels.length})
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
          >
            Approved
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Hotels List */}
      <div className="grid gap-4">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full lg:w-48 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {hotel.location}, {hotel.city}, {hotel.state}
                      </div>
                    </div>
                    <Badge variant={hotel.approved ? "default" : "secondary"}>
                      {hotel.approved ? "Approved" : "Pending Review"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-muted-foreground">
                        ({hotel.reviewCount} reviews)
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>{" "}
                      <span className="font-medium">₹{hotel.price}/night</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rooms:</span>{" "}
                      <span className="font-medium">{hotel.roomTypes.length} types</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.slice(0, 5).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 5} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    {!hotel.approved && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleReject(hotel.id)}
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApprove(hotel.id)}
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hotels found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
