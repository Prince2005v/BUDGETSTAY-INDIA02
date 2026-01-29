import { Link } from "react-router-dom";
import { City } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CityCardProps {
  city: City;
  size?: "sm" | "md" | "lg";
}

export function CityCard({ city, size = "md" }: CityCardProps) {
  const sizeClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
  };

  return (
    <Link
      to={`/hotels?city=${city.name}`}
      className={cn(
        "group relative block rounded-xl overflow-hidden hover-lift",
        sizeClasses[size]
      )}
    >
      <img
        src={city.image}
        alt={city.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg">{city.name}</h3>
        <p className="text-white/80 text-sm">{city.hotelCount} hotels</p>
      </div>
    </Link>
  );
}
