import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await axios.get(
        "http://localhost:5001/api/hotels"
      );

      setHotels(res.data.slice(0, 4)); // sirf 4 show on home
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <h2>Featured Hotels</h2>

      {hotels.length === 0 && <p>No hotels found</p>}

      <div>
        {hotels.map((hotel) => (
          <div key={hotel._id}>
            <h3>{hotel.name}</h3>
            <p>{hotel.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
