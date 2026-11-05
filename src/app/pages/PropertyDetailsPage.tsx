import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { toProperty } from '../../lib/properties';
import type { PropertyRecord } from '../../lib/properties';
import type { Property } from '../types';
import { useParams, Link } from 'react-router-dom';
import { mockProperties } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { PropertyMap } from '../components/PropertyMap';
import { VerifiedReputationPanel } from '../components/VerifiedReputationPanel';
import { ContactOwnerDialog } from '../components/ContactOwnerDialog';
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Waves,
  Home,
  ChevronLeft,
  Ruler,
  Square,
  DoorOpen,
  Calendar,
  Compass,
  Ban,
  Sun,
} from 'lucide-react';

export function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setLoading(true); setError(''); setProperty(null);
    if (!id) { setLoading(false); return; }
    supabase.from('properties').select('*').eq('id', id).single().then(({ data, error }) => {
      if (!active) return;
      if (error) setError(error.message);
      else if (data) setProperty(toProperty(data as PropertyRecord));
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);


  if (loading) return <div className="p-12 text-center">Cargando propiedad...</div>;
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{error ? `No se pudo cargar la propiedad: ${error}` : "Propiedad no encontrada"}</p>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Parking: Car,
    Pool: Waves,
    Kitchen: Home,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/listings" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a los anuncios
        </Link>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-2 md:row-span-2">
            <ImageWithFallback
              src={property.images[0]}
              alt={property.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
            />
          </div>
          {property.images.slice(1).map((image, index) => (
            <div key={index} className="hidden md:block">
              <ImageWithFallback
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-[240px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {property.location.address}, {property.location.city},{' '}
                      {property.location.country}
                    </span>
                  </div>

                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-2 text-[18px]">
                    <span className="text-blue-600">${property.price.toLocaleString('es-AR')}</span>
                    <span className="text-gray-600">/ mes</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 py-6 border-y">
                {/* Primera fila */}
                <div className="flex flex-col items-center text-center">
                  <Ruler className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">{property.totalArea || 85} m² tot.</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Square className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">{property.coveredArea || 52} m² cub.</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <DoorOpen className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">{property.rooms || 3} amb.</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Bath className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Bed className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">{property.bedrooms} dorm.</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">A estrenar</span>
                </div>
                
                {/* Segunda fila */}
                <div className="flex flex-col items-center text-center">
                  <Compass className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">Contrafrente</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Sun className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">Muy luminoso</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-3">Acerca de este lugar</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-3">Servicios</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities
                  .filter((amenity) => amenity !== 'WiFi' && amenity !== 'Cocina')
                  .map((amenity) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div key={amenity} className="flex items-center">
                        <Icon className="h-5 w-5 mr-3 text-gray-600" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            <Separator />

            {/* Map */}
            <PropertyMap
              address={property.location.address}
              coordinates={property.location.coordinates}
            />

            <Separator />

            {/* Host Info */}
            <div>
              <h3 className="text-gray-900 mb-4">Conoce al propietario</h3>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={property.host.avatar} />
                    <AvatarFallback>
                      {property.host.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{property.host.name}</h4>
                    <p className="text-gray-600 text-sm">
                      Se unió en {new Date(property.host.joinedDate).getFullYear()}
                    </p>

                  </div>
                </div>
                <ContactOwnerDialog property={property} />
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8"><VerifiedReputationPanel userId={property.host.id} role="owner" /></div>
    </div>
  );
}
