// src/hooks/useHotels.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useHotels = (limit?: number, city?: string | null) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        // Agar city hai toh query param bhejenge, warna normal fetch
        const response = await api.get("/hotels", {
          params: { city: city || undefined }
        });

        let data = response.data;
        if (limit) data = data.slice(0, limit);
        
        setHotels(data);
      } catch (err) {
        setError("Hotels load nahi ho paye");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [limit, city]); // City change hote hi phir se fetch hoga

  return { hotels, loading, error };
};
// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// export const useHotels = (limit?: number) => {
//   const [hotels, setHotels] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     api.get("/hotels")
//       .then(res => {
//         const data = limit ? res.data.slice(0, limit) : res.data;
//         setHotels(data);
//       })
//       .catch(() => setError("Failed to load hotels"))
//       .finally(() => setLoading(false));
//   }, [limit]);

//   return { hotels, loading, error };
// };
