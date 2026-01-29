import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { hotels, sampleBookings } from "@/lib/data";
import {
  Building,
  Calendar,
  IndianRupee,
  TrendingUp,
  Eye,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default function PartnerDashboard() {
  // Mock partner's hotels
  const partnerHotels = hotels.slice(0, 3);
  const partnerBookings = sampleBookings;

  const stats = [
    {
      title: "Total Hotels",
      value: partnerHotels.length,
      icon: Building,
      change: "+1 this month",
      changeType: "positive",
    },
    {
      title: "Active Bookings",
      value: partnerBookings.filter((b) => b.status === "confirmed").length,
      icon: Calendar,
      change: "+5 this week",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      icon: IndianRupee,
      change: "+12% from last month",
      changeType: "positive",
    },
    {
      title: "Profile Views",
      value: "2,340",
      icon: Eye,
      change: "+8% this week",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Partner!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your properties today.
          </p>
        </div>
        <Link to="/partner/add-hotel">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Hotel
          </Button>
        </Link>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link to="/partner/bookings">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerBookings.slice(0, 4).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.hotelName} • {booking.checkIn}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{booking.totalAmount.toLocaleString()}
                    </p>
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Hotels */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Hotels</CardTitle>
            <Link to="/partner/hotels">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground">{hotel.city}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        ⭐ {hotel.rating}
                      </Badge>
                      <span className="text-sm font-medium text-primary">
                        ₹{hotel.price}/night
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
