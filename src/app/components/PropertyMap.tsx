import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function PropertyMap({ address, coordinates }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Si no hay coordenadas, no renderizar el mapa
    if (!coordinates) return;

    // Importar Leaflet dinámicamente
    import('leaflet').then(async (L) => {
      // Importar CSS de Leaflet con crossOrigin para evitar errores de CORS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = 'anonymous';
      if (!document.querySelector(`link[href="${link.href}"]`)) {
        document.head.appendChild(link);
      }

      if (!mapRef.current) return;

      // Limpiar mapa existente si hay uno
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Crear el mapa
      const map = L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng],
        15
      );

      // Agregar tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Crear un ícono personalizado azul (#2563eb - blue-600 del logo RenTrust)
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: #2563eb;
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            border: 3px solid #ffffff;
          ">
            <svg 
              style="
                width: 20px;
                height: 20px;
                transform: rotate(45deg);
                color: white;
              "
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
        `,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Agregar marcador con el ícono personalizado
      L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(map);

      mapInstanceRef.current = map;

      // Cleanup
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
      };
    });
  }, [coordinates]);

  if (!coordinates || !Number.isFinite(coordinates.lat) || !Number.isFinite(coordinates.lng)) {
    return <section className="rounded-lg border p-4"><h3 className="font-semibold">Ubicación</h3><p className="text-sm">{address || "Dirección no informada"}</p><p className="text-xs text-gray-500 mt-2">El mapa no está disponible porque la propiedad no tiene coordenadas válidas.</p></section>;
  }

  return (
    <div>
      <h3 className="text-gray-900 mb-3">Ubicación</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="h-5 w-5 mt-0.5" />
          <span>{address}</span>
        </div>
        <div
          ref={mapRef}
          className="w-full h-[300px] rounded-lg overflow-hidden border border-gray-200"
          style={{ zIndex: 0 }}
        />
      </div>
    </div>
  );
}
