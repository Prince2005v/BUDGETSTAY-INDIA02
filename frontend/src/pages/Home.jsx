import { useEffect, useState } from "react";
import API from "../api/api";
import HotelCard from "../components/HotelCard";

export default function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    API.get("/hotels").then(res => setHotels(res.data));
  }, []);

  return (
    <div>
      <h1>BudgetStay India</h1>
      {hotels.map(hotel => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
}
