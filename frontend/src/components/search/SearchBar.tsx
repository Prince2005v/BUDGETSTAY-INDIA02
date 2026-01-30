import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search, MapPin, CalendarDays, Users, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { allCities } from "@/lib/data";

interface SearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({ className, variant = "hero" }: SearchBarProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const filteredCities = allCities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("rooms", rooms.toString());
    params.set("guests", guests.toString());
    navigate(`/hotels?${params.toString()}`);
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-medium p-4 md:p-6",
        isCompact && "p-3 md:p-4",
        className
      )}
    >
      <div
        className={cn(
          "grid gap-4",
          isCompact
            ? "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-end"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        {/* City Input */}
        <div className="space-y-2 relative">
          {!isCompact && (
            <label className="text-sm font-medium text-foreground">
              Destination
            </label>
          )}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Where are you going?"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setShowCities(true);
              }}
              onFocus={() => setShowCities(true)}
              onBlur={() => setTimeout(() => setShowCities(false), 200)}
              className="pl-10"
            />
          </div>
          {showCities && city && filteredCities.length > 0 && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredCities.slice(0, 6).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors"
                  onMouseDown={() => {
                    setCity(c);
                    setShowCities(false);
                  }}
                >
                  <MapPin className="inline-block h-3 w-3 mr-2 text-muted-foreground" />
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          {!isCompact && (
            <label className="text-sm font-medium text-foreground">
              Check-in
            </label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          {!isCompact && (
            <label className="text-sm font-medium text-foreground">
              Check-out
            </label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) =>
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Rooms */}
        {!isCompact && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Guests & Rooms
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  {guests} Guests, {rooms} Room
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rooms</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{rooms}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setRooms(Math.min(5, rooms + 1))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Guests</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{guests}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Search Button */}
        <div className={cn(!isCompact && "lg:pt-7")}>
          <Button
            onClick={handleSearch}
            className="w-full gap-2"
            size={isCompact ? "default" : "lg"}
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
