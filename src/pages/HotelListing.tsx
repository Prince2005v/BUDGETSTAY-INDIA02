import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchBar } from "@/components/search/SearchBar";
import { HotelCard } from "@/components/hotel/HotelCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { hotels, amenitiesList } from "@/lib/data";
import { Filter, Grid, List, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HotelListing() {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city") || "";
  
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      // City filter
      if (cityParam && !hotel.city.toLowerCase().includes(cityParam.toLowerCase())) {
        return false;
      }
      // Price filter
      if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) {
        return false;
      }
      // Rating filter
      if (hotel.rating < minRating) {
        return false;
      }
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((a) =>
          hotel.amenities.some((ha) => ha.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [cityParam, priceRange, minRating, selectedAmenities, sortBy]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={5000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-4">Minimum Rating</h4>
        <div className="flex gap-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setMinRating(rating)}
              className="gap-1"
            >
              {rating > 0 && <Star className="h-3 w-3" />}
              {rating === 0 ? "All" : `${rating}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-semibold mb-4">Amenities</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {amenitiesList.slice(0, 12).map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([0, 5000]);
          setMinRating(0);
          setSelectedAmenities([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <MainLayout>
      {/* Search Bar */}
      <div className="bg-card border-b">
        <div className="container py-4">
          <SearchBar variant="compact" />
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border p-6">
              <h3 className="font-semibold text-lg mb-6">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {cityParam ? `Hotels in ${cityParam}` : "All Hotels"}
                </h1>
                <p className="text-muted-foreground">
                  {filteredHotels.length} properties found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Toggle */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={view === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => setView("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => setView("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hotel Grid/List */}
            {filteredHotels.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl font-semibold mb-2">No hotels found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setMinRating(0);
                    setSelectedAmenities([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                )}
              >
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} variant={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
