import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hotels } from "@/lib/data";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2, PlusCircle } from "lucide-react";

export default function PartnerHotels() {
  const partnerHotels = hotels.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Hotels</h2>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Link to="/partner/add-hotel">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Hotel
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {partnerHotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full md:w-48 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {hotel.location}, {hotel.city}
                      </p>
                    </div>
                    <Badge variant={hotel.approved ? "default" : "secondary"}>
                      {hotel.approved ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Rating:</span>{" "}
                      <span className="font-medium">⭐ {hotel.rating}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>{" "}
                      <span className="font-medium">₹{hotel.price}/night</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reviews:</span>{" "}
                      <span className="font-medium">{hotel.reviewCount}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
