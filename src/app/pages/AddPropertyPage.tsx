import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { ChevronLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AddPropertyPage() {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const [photos, setPhotos] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!editId) return;
    supabase.from('properties').select('*').eq('id', editId).single().then(({ data, error }) => {
      if (error || !data) { toast.error('No se pudo cargar la propiedad'); return; }
      setFormData({ title: data.title, description: data.description, type: data.type, price: String(data.price), city: data.city, country: data.country, address: data.address, bedrooms: String(data.bedrooms), bathrooms: String(data.bathrooms), guests: String(data.guests), amenities: data.amenities || [] });
      setExistingImages(data.images || []);
    });
  }, [editId]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    price: '',
    city: '',
    country: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    amenities: [] as string[],
  });

  const amenitiesOptions = [
    'WiFi',
    'Cocina',
    'Aire acondicionado',
    'Calefacción',
    'Piscina',
    'Estacionamiento',
    'TV',
    'Lavadora',
    'Secadora',
    'Parrilla BBQ',
    'Espacio de trabajo',
    'Acceso al gimnasio',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Iniciá sesión para publicar una propiedad.');
      if (!formData.type) throw new Error('Seleccioná un tipo de propiedad.');
      if (Number(formData.price) <= 0) throw new Error('El precio debe ser mayor que cero.');
      const images = [...existingImages];
      for (const file of photos) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
          throw new Error('Las fotos deben ser JPG, PNG o WebP de hasta 10 MB.');
        }
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from('property-images').upload(path, file, { contentType: file.type });
        if (uploadError) throw uploadError;
        images.push(supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl);
      }
      const payload = {
        title: formData.title.trim(), description: formData.description.trim(), type: formData.type,
        price: Number(formData.price), city: formData.city.trim(), country: formData.country.trim(),
        address: formData.address.trim(), bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms), guests: Number(formData.guests),
        amenities: formData.amenities, images,
      };
      const result = editId
        ? await supabase.from('properties').update(payload).eq('id', editId).eq('owner_id', user.id).select('id').single()
        : await supabase.from('properties').insert({ ...payload, owner_id: user.id }).select('id').single();
      if (result.error) throw result.error;
      toast.success(editId ? 'Propiedad actualizada' : 'Propiedad publicada');
      navigate('/host');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo guardar la propiedad');
    } finally { setSaving(false); }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/host" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al panel
        </Link>

        <h1 className="text-gray-900 mb-8">{editId ? 'Editar propiedad' : 'Agregar nueva propiedad'}</h1>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Información básica</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título de la propiedad</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Hermoso apartamento con vista a la ciudad"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tu propiedad..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo de propiedad</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartamento</SelectItem>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="cabin">Cabaña</SelectItem>
                      <SelectItem value="condo">Condominio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Precio por noche ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="120"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Ubicación</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle Principal, 10"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Madrid"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="España"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Detalles de la propiedad</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Habitaciones</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  placeholder="2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  placeholder="2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="guests">Máx. huéspedes</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  placeholder="4"
                  required
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Servicios</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Fotos</h2>
            
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={e => setPhotos(Array.from(e.target.files || []))} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Haz clic para subir o arrastra archivos</p>
              <p className="text-gray-500 text-sm">PNG, JPG o WebP hasta 10MB</p>
              <p className="text-blue-600 text-sm mt-2">{photos.length} foto(s) nueva(s) seleccionada(s); {existingImages.length} existente(s)</p>
            </label>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Publicar propiedad'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/host')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
