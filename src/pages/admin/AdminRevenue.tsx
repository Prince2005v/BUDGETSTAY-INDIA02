import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminRevenue() {
  const revenueData = [
    { month: "Jan", revenue: 245000, bookings: 45 },
    { month: "Feb", revenue: 312000, bookings: 58 },
    { month: "Mar", revenue: 289000, bookings: 52 },
    { month: "Apr", revenue: 378000, bookings: 67 },
    { month: "May", revenue: 425000, bookings: 78 },
    { month: "Jun", revenue: 512000, bookings: 92 },
  ];

  const topHotels = [
    { name: "Hotel Royal Palace, Jaipur", revenue: 125000, bookings: 23 },
    { name: "Lake View Inn, Udaipur", revenue: 98000, bookings: 18 },
    { name: "Himalayan Retreat, Rishikesh", revenue: 87000, bookings: 15 },
    { name: "Blue City Haveli, Jodhpur", revenue: 76000, bookings: 14 },
    { name: "Ganga Darshan, Varanasi", revenue: 65000, bookings: 12 },
  ];

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const thisMonth = revenueData[revenueData.length - 1];
  const lastMonth = revenueData[revenueData.length - 2];
  const growth = ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Revenue Analytics</h2>
        <p className="text-muted-foreground">
          Platform revenue and financial insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="h-4 w-4" />
                {growth}%
              </div>
            </div>
            <p className="text-3xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
            <p className="text-sm text-muted-foreground">Total Revenue (6 months)</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold">₹{(thisMonth.revenue / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">This Month Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <IndianRupee className="h-5 w-5 text-accent" />
              </div>
            </div>
            <p className="text-3xl font-bold">
              ₹{Math.round(totalRevenue / revenueData.reduce((sum, d) => sum + d.bookings, 0)).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Avg. Booking Value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map((data, index) => {
                const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
                const percentage = (data.revenue / maxRevenue) * 100;
                const prevRevenue = index > 0 ? revenueData[index - 1].revenue : data.revenue;
                const change = ((data.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                const isPositive = data.revenue >= prevRevenue;

                return (
                  <div key={data.month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{data.month} 2024</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          ₹{(data.revenue / 1000).toFixed(0)}K
                        </span>
                        {index > 0 && (
                          <span
                            className={`flex items-center text-xs ${
                              isPositive ? "text-success" : "text-destructive"
                            }`}
                          >
                            {isPositive ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(parseFloat(change))}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Hotels */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHotels.map((hotel, index) => (
                <div
                  key={hotel.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{hotel.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {hotel.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₹{(hotel.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
