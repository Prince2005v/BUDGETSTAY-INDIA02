import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hotels, sampleBookings } from "@/lib/data";
import {
  Building,
  Calendar,
  IndianRupee,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const pendingHotels = hotels.filter((h) => !h.approved);
  const allBookings = sampleBookings;

  const stats = [
    {
      title: "Total Hotels",
      value: hotels.length,
      icon: Building,
      change: "+3 this month",
      changeType: "positive",
    },
    {
      title: "Total Bookings",
      value: allBookings.length,
      icon: Calendar,
      change: "+12 today",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: "₹12,45,000",
      icon: IndianRupee,
      change: "+18% from last month",
      changeType: "positive",
    },
    {
      title: "Active Partners",
      value: "156",
      icon: Users,
      change: "+8 this week",
      changeType: "positive",
    },
  ];

  const bookingStats = [
    { label: "Confirmed", count: 45, icon: CheckCircle, color: "text-success" },
    { label: "Pending", count: 12, icon: Clock, color: "text-warning" },
    { label: "Cancelled", count: 3, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your platform's performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
              <p className="text-xs text-success mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-bold">{stat.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Hotel Approvals</CardTitle>
            <Link to="/admin/hotels">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingHotels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
                <p>All hotels are reviewed!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {hotels.slice(0, 3).map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50"
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{hotel.name}</p>
                      <p className="text-sm text-muted-foreground">{hotel.city}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Link to="/admin/bookings">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Guest</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hotel</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Dates</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-mono text-sm">{booking.id}</td>
                    <td className="py-3 px-4">{booking.guestName}</td>
                    <td className="py-3 px-4">{booking.hotelName}</td>
                    <td className="py-3 px-4 text-sm">
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ₹{booking.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
