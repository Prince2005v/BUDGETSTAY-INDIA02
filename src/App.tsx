import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelListing from "./pages/HotelListing";
import HotelDetails from "./pages/HotelDetails";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PartnerLayout from "./pages/partner/PartnerLayout";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerHotels from "./pages/partner/PartnerHotels";
import AddHotel from "./pages/partner/AddHotel";
import PartnerBookings from "./pages/partner/PartnerBookings";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHotels from "./pages/admin/AdminHotels";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRevenue from "./pages/admin/AdminRevenue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hotels" element={<HotelListing />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          
          {/* Partner Dashboard */}
          <Route path="/partner" element={<PartnerLayout />}>
            <Route path="dashboard" element={<PartnerDashboard />} />
            <Route path="hotels" element={<PartnerHotels />} />
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="bookings" element={<PartnerBookings />} />
          </Route>
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="revenue" element={<AdminRevenue />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
