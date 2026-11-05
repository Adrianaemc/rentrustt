import { supabase } from './supabase';
import type { Property } from '../app/types';

export type PropertyRecord = {
  id: string; owner_id: string; title: string; description: string; type: Property['type'];
  price: number; city: string; country: string; address: string;
  bedrooms: number; bathrooms: number; guests: number; amenities: string[];
  images: string[]; created_at: string;
};
export function toProperty(p: PropertyRecord): Property {
  return {
    id: p.id, title: p.title, description: p.description, type: p.type, price: Number(p.price),
    location: { city: p.city, country: p.country, address: p.address },
    images: p.images || [], bedrooms: p.bedrooms, bathrooms: p.bathrooms, guests: p.guests,
    amenities: p.amenities || [],
    host: { id: p.owner_id, name: 'Propietario', avatar: '', joinedDate: p.created_at, rating: 0, reviewCount: 0, reviews: [] },
  };
}
export async function fetchProperties(): Promise<PropertyRecord[]> {
  const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as PropertyRecord[];
}
