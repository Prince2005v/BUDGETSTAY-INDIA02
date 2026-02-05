// Dummy data for hotel booking website

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  roomTypes: RoomType[];
  featured?: boolean;
  approved?: boolean;
  partnerId?: string;
}

export interface RoomType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  capacity: number;
  bedType: string;
  amenities: string[];
  available: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  roomType: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface City {
  name: string;
  state: string;
  image: string;
  hotelCount: number;
}

export const popularCities: City[] = [
  { name: "Jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", hotelCount: 342 },
  { name: "Udaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=400", hotelCount: 198 },
  { name: "Varanasi", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400", hotelCount: 156 },
  { name: "Mysore", state: "Karnataka", image: "https://images.unsplash.com/photo-1600100397608-f1d1e3a3e0f4?w=400", hotelCount: 124 },
  { name: "Rishikesh", state: "Uttarakhand", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400", hotelCount: 89 },
  { name: "Agra", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400", hotelCount: 267 },
  { name: "Jodhpur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400", hotelCount: 145 },
  { name: "Amritsar", state: "Punjab", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", hotelCount: 178 },
];

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Hotel Royal Palace",
    location: "Near City Palace, MI Road",
    city: "Jaipur",
    state: "Rajasthan",
    price: 1499,
    originalPrice: 2499,
    rating: 4.3,
    reviewCount: 856,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    description: "Experience royal hospitality at Hotel Royal Palace, located in the heart of Jaipur. Our hotel offers a perfect blend of traditional Rajasthani architecture and modern amenities. Just minutes away from major attractions like City Palace and Hawa Mahal.",
    amenities: ["Free WiFi", "AC Rooms", "Restaurant", "Room Service", "Parking", "Power Backup", "CCTV Security", "24/7 Front Desk"],
    roomTypes: [
      { id: "r1", name: "Standard Room", price: 1499, originalPrice: 2499, capacity: 2, bedType: "Double Bed", amenities: ["AC", "TV", "Attached Bathroom"], available: 5 },
      { id: "r2", name: "Deluxe Room", price: 2299, originalPrice: 3499, capacity: 2, bedType: "King Bed", amenities: ["AC", "TV", "Mini Fridge", "Balcony"], available: 3 },
      { id: "r3", name: "Family Suite", price: 3499, originalPrice: 4999, capacity: 4, bedType: "2 Double Beds", amenities: ["AC", "TV", "Living Area", "Kitchenette"], available: 2 },
    ],
    featured: true,
    approved: true,
  },
  {
    id: "2",
    name: "Lake View Inn",
    location: "Lake Pichola Road, Old City",
    city: "Udaipur",
    state: "Rajasthan",
    price: 1899,
    originalPrice: 2999,
    rating: 4.6,
    reviewCount: 634,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    description: "Wake up to stunning views of Lake Pichola at Lake View Inn. Our boutique hotel offers an intimate and luxurious experience with personalized service and authentic Rajasthani cuisine.",
    amenities: ["Lake View", "Free WiFi", "Rooftop Restaurant", "AC Rooms", "Cultural Programs", "Airport Transfer", "Laundry"],
    roomTypes: [
      { id: "r1", name: "Lake View Room", price: 1899, originalPrice: 2999, capacity: 2, bedType: "Double Bed", amenities: ["Lake View", "AC", "TV"], available: 4 },
      { id: "r2", name: "Heritage Room", price: 2699, originalPrice: 3999, capacity: 2, bedType: "King Bed", amenities: ["Lake View", "AC", "Antique Decor"], available: 2 },
    ],
    featured: true,
    approved: true,
  },
  {
    id: "3",
    name: "Ganga Darshan Hotel",
    location: "Dashashwamedh Ghat Road",
    city: "Varanasi",
    state: "Uttar Pradesh",
    price: 999,
    originalPrice: 1599,
    rating: 4.1,
    reviewCount: 1023,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    description: "Located just steps from the sacred Ganges River, Ganga Darshan Hotel offers pilgrims and travelers a peaceful retreat with views of the evening Ganga Aarti ceremony.",
    amenities: ["Ganga View", "Free WiFi", "Vegetarian Restaurant", "Yoga Classes", "Temple Tours", "Laundry"],
    roomTypes: [
      { id: "r1", name: "Standard Room", price: 999, originalPrice: 1599, capacity: 2, bedType: "Double Bed", amenities: ["Fan", "TV", "Attached Bathroom"], available: 8 },
      { id: "r2", name: "Ganga View Room", price: 1599, originalPrice: 2299, capacity: 2, bedType: "Double Bed", amenities: ["AC", "River View", "TV"], available: 4 },
    ],
    featured: true,
    approved: true,
  },
  {
    id: "4",
    name: "Mysore Heritage Stay",
    location: "Chamundeshwari Road",
    city: "Mysore",
    state: "Karnataka",
    price: 1299,
    originalPrice: 1999,
    rating: 4.4,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    ],
    description: "Experience the grandeur of Karnataka at Mysore Heritage Stay. Located near Mysore Palace, we offer authentic South Indian hospitality with comfortable accommodations.",
    amenities: ["Free WiFi", "AC Rooms", "South Indian Restaurant", "Palace Tours", "Parking", "Garden"],
    roomTypes: [
      { id: "r1", name: "Classic Room", price: 1299, originalPrice: 1999, capacity: 2, bedType: "Double Bed", amenities: ["AC", "TV", "Hot Water"], available: 6 },
      { id: "r2", name: "Heritage Suite", price: 2199, originalPrice: 2999, capacity: 3, bedType: "King Bed", amenities: ["AC", "TV", "Living Area", "Antique Furniture"], available: 2 },
    ],
    featured: false,
    approved: true,
  },
  {
    id: "5",
    name: "Himalayan Retreat",
    location: "Laxman Jhula Road",
    city: "Rishikesh",
    state: "Uttarakhand",
    price: 1799,
    originalPrice: 2799,
    rating: 4.7,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    description: "Find your inner peace at Himalayan Retreat. Nestled in the spiritual town of Rishikesh, our eco-friendly resort offers yoga retreats, meditation sessions, and stunning mountain views.",
    amenities: ["Mountain View", "Yoga Shala", "Organic Restaurant", "WiFi", "River Access", "Spa", "Adventure Sports"],
    roomTypes: [
      { id: "r1", name: "Garden Cottage", price: 1799, originalPrice: 2799, capacity: 2, bedType: "Double Bed", amenities: ["AC", "Garden View", "Sit-out"], available: 5 },
      { id: "r2", name: "River View Suite", price: 2999, originalPrice: 4299, capacity: 2, bedType: "King Bed", amenities: ["AC", "River View", "Balcony", "Jacuzzi"], available: 2 },
    ],
    featured: true,
    approved: true,
  },
  {
    id: "6",
    name: "Taj View Guest House",
    location: "Taj Ganj, South Gate",
    city: "Agra",
    state: "Uttar Pradesh",
    price: 899,
    originalPrice: 1499,
    rating: 4.0,
    reviewCount: 1567,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    description: "The most affordable way to experience the Taj Mahal! Our rooftop restaurant offers breathtaking views of the monument. Clean, comfortable rooms with warm hospitality.",
    amenities: ["Taj View Rooftop", "Free WiFi", "Restaurant", "Tour Desk", "Luggage Storage", "24/7 Reception"],
    roomTypes: [
      { id: "r1", name: "Budget Room", price: 899, originalPrice: 1499, capacity: 2, bedType: "Double Bed", amenities: ["Fan", "TV", "Attached Bathroom"], available: 10 },
      { id: "r2", name: "Taj View Room", price: 1499, originalPrice: 2299, capacity: 2, bedType: "Double Bed", amenities: ["AC", "Taj View", "TV"], available: 4 },
    ],
    featured: false,
    approved: true,
  },
  {
    id: "7",
    name: "Blue City Haveli",
    location: "Clock Tower, Old City",
    city: "Jodhpur",
    state: "Rajasthan",
    price: 1399,
    originalPrice: 2199,
    rating: 4.5,
    reviewCount: 398,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    description: "A restored heritage haveli in the heart of the Blue City. Experience traditional Rajasthani architecture with modern comforts. Fort views from our rooftop cafe.",
    amenities: ["Fort View", "Heritage Property", "Free WiFi", "Rooftop Cafe", "AC Rooms", "Cultural Tours", "Cooking Classes"],
    roomTypes: [
      { id: "r1", name: "Haveli Room", price: 1399, originalPrice: 2199, capacity: 2, bedType: "Double Bed", amenities: ["AC", "Traditional Decor", "TV"], available: 6 },
      { id: "r2", name: "Royal Suite", price: 2599, originalPrice: 3799, capacity: 3, bedType: "King Bed", amenities: ["AC", "Fort View", "Sitting Area"], available: 2 },
    ],
    featured: true,
    approved: true,
  },
  {
    id: "8",
    name: "Golden Temple View",
    location: "Near Golden Temple, Town Hall",
    city: "Amritsar",
    state: "Punjab",
    price: 1199,
    originalPrice: 1899,
    rating: 4.2,
    reviewCount: 723,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    description: "Walking distance from the Golden Temple, our hotel offers comfortable stays with authentic Punjabi hospitality. Enjoy langar seva arrangements and guided temple visits.",
    amenities: ["Temple Proximity", "Free WiFi", "Punjabi Restaurant", "AC Rooms", "Tour Assistance", "Luggage Storage", "Parking"],
    roomTypes: [
      { id: "r1", name: "Standard Room", price: 1199, originalPrice: 1899, capacity: 2, bedType: "Double Bed", amenities: ["AC", "TV", "Hot Water"], available: 8 },
      { id: "r2", name: "Family Room", price: 1999, originalPrice: 2899, capacity: 4, bedType: "2 Double Beds", amenities: ["AC", "TV", "Mini Fridge"], available: 4 },
    ],
    featured: false,
    approved: true,
  },
];

export const sampleBookings: Booking[] = [
  {
    id: "BK001",
    hotelId: "1",
    hotelName: "Hotel Royal Palace",
    guestName: "Rahul Sharma",
    guestEmail: "rahul.sharma@email.com",
    guestPhone: "+91 98765 43210",
    checkIn: "2024-02-15",
    checkOut: "2024-02-17",
    rooms: 1,
    guests: 2,
    roomType: "Deluxe Room",
    totalAmount: 4598,
    status: "confirmed",
    createdAt: "2024-02-10",
  },
  {
    id: "BK002",
    hotelId: "2",
    hotelName: "Lake View Inn",
    guestName: "Priya Patel",
    guestEmail: "priya.patel@email.com",
    guestPhone: "+91 87654 32109",
    checkIn: "2024-02-20",
    checkOut: "2024-02-23",
    rooms: 2,
    guests: 4,
    roomType: "Lake View Room",
    totalAmount: 11394,
    status: "pending",
    createdAt: "2024-02-12",
  },
  {
    id: "BK003",
    hotelId: "5",
    hotelName: "Himalayan Retreat",
    guestName: "Amit Kumar",
    guestEmail: "amit.kumar@email.com",
    guestPhone: "+91 76543 21098",
    checkIn: "2024-02-18",
    checkOut: "2024-02-21",
    rooms: 1,
    guests: 2,
    roomType: "River View Suite",
    totalAmount: 8997,
    status: "completed",
    createdAt: "2024-02-08",
  },
];

export const allCities = [
  "Jaipur", "Udaipur", "Varanasi", "Mysore", "Rishikesh", "Agra", "Jodhpur", "Amritsar",
  "Pushkar", "Khajuraho", "Hampi", "Madurai", "Ooty", "Munnar", "Shimla", "Manali",
  "Darjeeling", "Gangtok", "Jaisalmer", "Bikaner", "Mount Abu", "Kodaikanal", "Coorg", "Alleppey"
];

export const amenitiesList = [
  "Free WiFi", "AC Rooms", "Restaurant", "Room Service", "Parking", "Power Backup",
  "CCTV Security", "24/7 Front Desk", "Laundry", "Spa", "Swimming Pool", "Gym",
  "Airport Transfer", "Tour Desk", "Lake View", "Mountain View", "Garden", "Rooftop",
  "Yoga Classes", "Pet Friendly", "Wheelchair Accessible", "Business Center"
];
const data = {
  popularCities: [
    { name: "Udaipur", image: "...", hotels: 120 },
    { name: "Rishikesh", image: "...", hotels: 90 }
  ]
};

export default data;
