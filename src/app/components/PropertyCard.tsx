import { Link } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import { Property } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginDialog } from './LoginDialog';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
  onToggleFavorite?: (id: string) => void;
}

export function PropertyCard({ property, onToggleFavorite }: PropertyCardProps) {
  const { isLoggedIn, isFavorite: checkIsFavorite, toggleFavorite } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const isFavorite = checkIsFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    
    toggleFavorite(property.id);
    onToggleFavorite?.(property.id);
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos');
  };

  return (
    <div className="h-full">
      <Link to={`/property/${property.id}`} className="block h-full">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageWithFallback
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`h-5 w-5 ${
                  isLoggedIn && isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'
                }`}
              />
            </Button>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="line-clamp-1 text-gray-900 dark:text-gray-100 mb-1">{property.title}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">
                {property.location.city}, {property.location.country}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {property.totalArea && property.coveredArea ? (
                <span>
                  {property.totalArea} m² tot. · {property.coveredArea} m² cub. · {property.rooms} amb. · {property.bedrooms} dorm. · {property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}
                </span>
              ) : (
                <span>
                  {property.bedrooms} hab · {property.bathrooms} baños · {property.guests}{' '}
                  huéspedes
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1 flex-shrink-0" />
                <span className="dark:text-gray-300">
                  {property.host.rating} ({property.host.reviewCount})
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">· Propietario</span>
              </div>
              <div className="flex-shrink-0">
                <span className="text-gray-900 dark:text-gray-100">${property.price}</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm"> / mes</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
      
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <div />
      </LoginDialog>
    </div>
  );
}
