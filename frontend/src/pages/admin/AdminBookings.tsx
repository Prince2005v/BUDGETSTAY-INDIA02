import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleBookings } from "@/lib/data";
import { Calendar, User, Phone, Mail, Building } from "lucide-react";

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">All Bookings</h2>
        <p className="text-muted-foreground">
          View and manage all platform bookings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{sampleBookings.length}</p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">
              {sampleBookings.filter((b) => b.status === "confirmed").length}
            </p>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-warning">
              {sampleBookings.filter((b) => b.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">
              ₹{sampleBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {sampleBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{booking.hotelName}</p>
                        <p className="text-muted-foreground">{booking.roomType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-muted-foreground">{booking.guestEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {booking.checkIn} → {booking.checkOut}
                        </p>
                        <p className="text-muted-foreground">
                          {booking.rooms} room(s), {booking.guests} guest(s)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ₹{booking.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Booked on {booking.createdAt}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
