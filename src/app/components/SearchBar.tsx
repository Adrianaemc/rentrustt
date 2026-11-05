import { Search, MapPin, Home, DollarSign, Bed } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
  propertyType: string;
  location: string;
  priceMin: string;
  priceMax: string;
  rooms: string;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [propertyType, setPropertyType] = useState('todos');
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [rooms, setRooms] = useState('todos');

  const handleSearch = () => {
    onSearch?.({ propertyType, location, priceMin, priceMax, rooms });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden">
      {/* Search Fields */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Property Type */}
          <div className="flex-1 min-w-0">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12 w-full">
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <SelectValue placeholder="Tipo de propiedad" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="departamento">Departamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="ph">PH</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="campo">Campo</SelectItem>
                <SelectItem value="cochera">Cochera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 flex-shrink-0" />
              <Input
                placeholder="Dirección, barrio, localidad o partido"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 w-full pl-10"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-12 justify-start text-left font-normal">
                  <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 truncate">
                    {priceMin || priceMax 
                      ? `${priceMin ? '$' + priceMin : 'Min'} - ${priceMax ? '$' + priceMax : 'Max'}`
                      : 'Precio'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Precio mínimo</label>
                    <Input
                      type="number"
                      placeholder="$ Mínimo"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Precio máximo</label>
                    <Input
                      type="number"
                      placeholder="$ Máximo"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => { setPriceMin(''); setPriceMax('50000'); }}
                    >
                      Hasta 50k
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => { setPriceMin('50000'); setPriceMax('100000'); }}
                    >
                      50k - 100k
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => { setPriceMin('100000'); setPriceMax(''); }}
                    >
                      Más de 100k
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Rooms */}
          <div className="flex-1 min-w-0">
            <Select value={rooms} onValueChange={setRooms}>
              <SelectTrigger className="h-12 w-full">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <SelectValue placeholder="Ambientes" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="1">1 ambiente</SelectItem>
                <SelectItem value="2">2 ambientes</SelectItem>
                <SelectItem value="3">3 ambientes</SelectItem>
                <SelectItem value="4">4 ambientes</SelectItem>
                <SelectItem value="5">5+ ambientes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
