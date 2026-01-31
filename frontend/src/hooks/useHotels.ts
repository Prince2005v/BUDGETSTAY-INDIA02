import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/hotels")
      .then(res => setHotels(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { hotels, loading };
};

