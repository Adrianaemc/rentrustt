export interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'cabin' | 'condo';
  price: number;
  location: {
    city: string;
    country: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  host: {
    id: string;
    name: string;
    avatar: string;
    joinedDate: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
  };
  isFavorite?: boolean;
  // Campos para alquiler a largo plazo
  totalArea?: number; // m² totales
  coveredArea?: number; // m² cubiertos
  rooms?: number; // ambientes
}

export interface Booking {
  id: string;
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  bio: string;
  isHost: boolean;
}
