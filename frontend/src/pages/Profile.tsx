import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, LogOut, Camera, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  
  // Initial state from LocalStorage or Default
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {
      name: "Prince",
      email: "prince@gmail.com",
      city: "Delhi",
      phone: "9876543210",
      avatar: "",
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
    alert("Profile Updated Locally! ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-4 gap-6">
        
        {/* LEFT PROFILE CARD */}
        <Card className="h-fit">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary/10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl bg-primary/5 text-primary">
                  {user.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full border shadow-sm">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            
            <div className="mt-6 w-full space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground px-2">
                <MapPin className="h-4 w-4 text-primary" /> {user.city}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground px-2">
                <Phone className="h-4 w-4 text-primary" /> {user.phone}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT CONTENT TABS */}
        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>

            {/* PROFILE TAB */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant={editing ? "default" : "outline"} 
                    onClick={editing ? handleSave : () => setEditing(true)}
                  >
                    {editing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" disabled={!editing} value={user.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" disabled value={user.email} className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" disabled={!editing} value={user.city} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" disabled={!editing} value={user.phone} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BOOKINGS TAB */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader><CardTitle>Booking History</CardTitle></CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-primary/5 p-4 rounded-full mb-4">
                    <User className="h-8 w-8 text-primary/40" />
                  </div>
                  <p className="text-muted-foreground">No bookings found. Time to explore!</p>
                  <Button variant="link" onClick={() => navigate("/hotels")}>Browse Hotels</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SETTINGS TAB */}
            <TabsContent value="settings">
              <Card>
                <CardHeader><CardTitle>Danger Zone</CardTitle></CardHeader>
                <CardContent>
                  <Button variant="destructive" className="flex gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" /> Sign Out from BudgetStay
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// 🔥 YE SABSE IMPORTANT HAI (Default Export)
export default Profile;