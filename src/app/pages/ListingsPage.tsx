import { useEffect, useState } from 'react';
import { fetchProperties, toProperty } from '../../lib/properties';
import { supabase } from '../../lib/supabase';
import type { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { SearchBar } from '../components/SearchBar';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

export function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  useEffect(() => {
    let mounted = true;
    async function loadAvailableListings() {
      try {
        const rows = await fetchProperties();
        // No mostrar anuncios finalizados ni propiedades con alquiler vigente.
        const { data: contracts, error: contractError } = await supabase
          .from('rental_contracts')
          .select('property_id,status')
          .in('status', ['active', 'completed', 'pending_review']);
        if (contractError) throw contractError;
        const unavailableIds = new Set((contracts || []).map(c => c.property_id));
        const visible = rows.filter(row => {
          const status = String((row as any).status ?? 'active').toLowerCase();
          return !['completed', 'finished', 'finalized', 'inactive', 'archived', 'cancelled'].includes(status)
            && !unavailableIds.has(row.id);
        });
        if (mounted) setProperties(visible.map(toProperty));
      } catch (err) {
        if (mounted) setLoadError(err instanceof Error ? err.message : 'Error al consultar propiedades');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void loadAvailableListings();
    return () => { mounted = false; };
  }, []);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [search, setSearch] = useState({propertyType:'todos', location:'', priceMin:'', priceMax:'', rooms:'todos'});
  const [amenities, setAmenities] = useState<string[]>([]);

  const normalize = (v: unknown) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const typeAliases: Record<string,string> = {departamento:'apartment', casa:'house'};
  const visibleProperties = properties.filter(p => {
    if (selectedType !== 'all' && p.type !== selectedType) return false;
    if (p.price < priceRange[0] || (priceRange[1] < 5000000 && p.price > priceRange[1])) return false;
    if (search.propertyType !== 'todos' && p.type !== (typeAliases[search.propertyType] || search.propertyType)) return false;
    if (search.priceMin && p.price < Number(search.priceMin)) return false;
    if (search.priceMax && p.price > Number(search.priceMax)) return false;
    if (search.rooms !== 'todos' && (p.rooms ?? p.bedrooms) < Number(search.rooms)) return false;
    if (search.location && !normalize([p.title,p.location?.city,p.location?.address].join(' ')).includes(normalize(search.location))) return false;
    return amenities.every(a => (p.amenities || []).some(v => normalize(v) === normalize(a)));
  }).sort((a,b) => sortBy === 'price-low' ? a.price-b.price : sortBy === 'price-high' ? b.price-a.price : sortBy === 'rating' ? (b.host?.rating || 0)-(a.host?.rating || 0) : (b.host?.rating || 0)-(a.host?.rating || 0) || a.price-b.price);
  const amenitiesOptions = ['Parrilla', 'Piscina', 'Estacionamiento', 'Aire acondicionado', 'Calefacción'];

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm mb-3 block text-gray-700 dark:text-gray-300">Tipo de alojamiento</label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="apartment">Departamento</SelectItem>
            <SelectItem value="house">Casa</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="cabin">Cabaña</SelectItem>
            <SelectItem value="ph">PH</SelectItem>
            <SelectItem value="local">Local</SelectItem>
            <SelectItem value="oficina">Oficina</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm mb-3 block text-gray-700 dark:text-gray-300">
          Rango de precios: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={5000000}
          step={50000}
          className="mt-2"
        />
      </div>

      <div>
        <label className="text-sm mb-3 block text-gray-700 dark:text-gray-300">Servicios</label>
        <div className="space-y-2">
          {amenitiesOptions.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={amenity} checked={amenities.includes(amenity)} onCheckedChange={checked => setAmenities(prev => checked ? [...prev, amenity] : prev.filter(v => v !== amenity))} />
              <label
                htmlFor={amenity}
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Bar Section */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar onSearch={setSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 dark:text-gray-100 mb-2">Todas las propiedades</h1>
            <p className="text-gray-600 dark:text-gray-400">{visibleProperties.length} propiedades disponibles</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recomendadas (valoración y precio)</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorado</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24 border dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">Filtros</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            {loading && <p className="mb-4">Cargando propiedades...</p>}
            <p className="mb-3 text-xs text-gray-600">Recomendaciones explicables: por defecto se priorizan propiedades con mayor valoración y, en caso de empate, menor precio. No se utiliza IA ni se infieren preferencias personales.</p>
            {loadError && <p role="alert" className="mb-4 text-red-600">{loadError}. Revisá que hayas ejecutado SUPABASE_ETAPA2.sql.</p>}
            {!loading && !loadError && visibleProperties.length === 0 && <p className="mb-4">Todavía no hay propiedades que coincidan con los filtros.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
