import { PropertyCard } from '../components/PropertyCard';
import { useEffect, useState } from 'react';
import { fetchProperties, toProperty } from '../../lib/properties';
import type { Property } from '../types';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function FavoritesPage() {
  const { favorites } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchProperties().then(rows => setProperties(rows.map(toProperty)))
      .catch(err => setError(err.message || 'No se pudieron cargar las propiedades'));
  }, []);
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Mis Favoritos</h1>
          <p className="text-gray-600">
            {favoriteProperties.length} propiedades guardadas
          </p>
        </div>

        {error && <p role="alert" className="text-red-600 mb-4">{error}</p>}
        {favoriteProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-2">Aún no tienes favoritos</h2>
            <p className="text-gray-600 mb-6">
              Comienza a explorar y guarda tus propiedades favoritas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
