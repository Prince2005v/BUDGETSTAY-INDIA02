import { useHotels } from "@/hooks/useHotels";

const Hotels = () => {
  const { hotels, loading, error } = useHotels();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Hotels</h2>

      {hotels.map((hotel: any) => (
        <div key={hotel._id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.city}</p>
        </div>
      ))}
    </div>
  );
};

export default Hotels;
