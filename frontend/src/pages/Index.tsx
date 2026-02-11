// import { MainLayout } from "@/components/layout/MainLayout";
// import { SearchBar } from "@/components/search/SearchBar";
// import { HotelCard } from "@/components/hotel/HotelCard";
// import { CityCard } from "@/components/city/CityCard";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useHotels } from "@/hooks/useHotels";
// import { ArrowRight, Shield, Headphones, Percent, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
// import  api  from "@/lib/api";
// import data from "@/lib/data";



// const popularCities = data.popularCities;



// const Index = () => {
//   const { hotels, loading } = useHotels();
// const featuredHotels = hotels.filter((h: any) => h.featured);


//   return (
//     <MainLayout>
//       {/* Hero Section */}
//       <section className="relative min-h-[600px] flex items-center">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
//             alt="Hotel"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
//         </div>

//         <div className="container relative z-10 py-16 md:py-24">
//           <div className="max-w-3xl animate-fade-in">
//             <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
//               🎉 Save up to 40% on your first booking
//             </Badge>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               Budget-Friendly Stays in{" "}
//               <span className="text-primary">India's Hidden Gems</span>
//             </h1>
//             <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
//               Discover comfortable and affordable hotels across Tier-2 and Tier-3 cities. 
//               Experience authentic India without breaking the bank.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="max-w-5xl animate-slide-up">
//             <SearchBar />
//           </div>
//         </div>
//       </section>

//       {/* Trust Badges */}
//       <section className="py-8 bg-secondary/50">
//         <div className="container">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                 <Shield className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-semibold text-foreground">Secure Booking</p>
//                 <p className="text-sm text-muted-foreground">100% Safe & Secure</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                 <Percent className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-semibold text-foreground">Best Prices</p>
//                 <p className="text-sm text-muted-foreground">Price Match Guarantee</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                 <Headphones className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-semibold text-foreground">24/7 Support</p>
//                 <p className="text-sm text-muted-foreground">Always Here to Help</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                 <MapPin className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-semibold text-foreground">500+ Cities</p>
//                 <p className="text-sm text-muted-foreground">Across India</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Hotels */}
//       <section className="py-16">
//         <div className="container">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
//                 Featured Budget Hotels
//               </h2>
//               <p className="text-muted-foreground">
//                 Handpicked properties with the best value
//               </p>
//             </div>
//             <Link to="/hotels">
//               <Button variant="outline" className="gap-2">
//                 View All <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {featuredHotels.map((hotel) => (
//               <HotelCard key={hotel.id} hotel={hotel} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Cities */}
//       <section className="py-16 bg-secondary/30">
//         <div className="container">
//           <div className="text-center mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
//               Explore Popular Destinations
//             </h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               From spiritual havens to royal palaces, discover the magic of India's 
//               lesser-known cities
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {popularCities.map((city, index) => (

//               <CityCard
//                 key={city.name}
//                 city={city}
//                 size={index < 2 ? "lg" : "md"}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-primary">
//         <div className="container">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
//                 List Your Property with Us
//               </h2>
//               <p className="text-primary-foreground/80 max-w-lg">
//                 Join 10,000+ hotel partners and reach millions of travelers. 
//                 Zero registration fees for the first year!
//               </p>
//             </div>
//             <Link to="/partner/dashboard">
//               <Button size="lg" variant="secondary" className="gap-2">
//                 Become a Partner <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </MainLayout>
//   );
// };

// export default Index;
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchBar } from "@/components/search/SearchBar";
import { HotelCard } from "@/components/hotel/HotelCard";
import { CityCard } from "@/components/city/CityCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHotels } from "@/hooks/useHotels";
import { ArrowRight, Shield, Headphones, Percent, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { popularCities } from "@/lib/data";


const Index = () => {
  // 🔥 Home page → sirf limited hotels
  const { hotels, loading } = useHotels(8);

  return (
    <MainLayout>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-foreground/20 to-foreground/10" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              🎉 Save up to 40% on your first booking
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Budget-Friendly Stays in{" "}
              <span className="text-primary">India’s Hidden Gems</span>
            </h1>

            <p className="text-lg text-white/80 mb-8">
              Affordable hotels across Tier-2 & Tier-3 cities. Travel smart.
            </p>
          </div>

          <div className="max-w-5xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES ================= */}
      <section className="py-8 bg-secondary/50">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
          <Trust icon={<Shield />} title="Secure Booking" desc="100% Safe" />
          <Trust icon={<Percent />} title="Best Prices" desc="Price Match" />
          <Trust icon={<Headphones />} title="24/7 Support" desc="Always Online" />
          <Trust icon={<MapPin />} title="500+ Cities" desc="Across India" />
        </div>
      </section>

      {/* ================= FEATURED HOTELS ================= */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Budget Hotels</h2>
              <p className="text-muted-foreground">
                Handpicked best value stays
              </p>
            </div>

            <Link to="/hotels">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading && <p>Loading hotels...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!loading &&
              hotels.map((hotel: any) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR CITIES ================= */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">
            Explore Popular Cities
          </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
 {popularCities.map((city, i) => (
  <CityCard
    key={city.name}
    city={city}
    size={i < 2 ? "lg" : "md"}
  />
))}
      </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-primary">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-primary-foreground">
              List Your Property
            </h2>
            <p className="text-primary-foreground/80">
              Zero registration fees for first year
            </p>
          </div>

          <Link to="/partner/dashboard">
            <Button variant="secondary" size="lg">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

/* ================= SMALL COMPONENT ================= */
const Trust = ({ icon, title, desc }: any) => (
  <div className="flex items-center gap-3">
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);
