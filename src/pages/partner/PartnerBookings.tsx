import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleBookings } from "@/lib/data";
import { Calendar, MapPin, User, Phone, Mail, Check, X } from "lucide-react";

export default function PartnerBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bookings</h2>
        <p className="text-muted-foreground">
          View and manage all bookings for your properties
        </p>
      </div>

      <div className="grid gap-4">
        {sampleBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">
                      #{booking.id}
                    </span>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                          ? "secondary"
                          : booking.status === "completed"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
                    <p className="text-sm text-muted-foreground">{booking.roomType}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {booking.guestName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {booking.guestPhone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {booking.guestEmail}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {booking.checkIn} → {booking.checkOut}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <div>
                    <p className="text-2xl font-bold">
                      ₹{booking.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.rooms} room(s), {booking.guests} guest(s)
                    </p>
                  </div>
                  
                  {booking.status === "pending" && (
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <X className="h-4 w-4" />
                        Decline
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Check className="h-4 w-4" />
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
