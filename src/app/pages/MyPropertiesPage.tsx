import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { fetchProperties, type PropertyRecord } from '../../lib/properties';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

export function MyPropertiesPage() {
  const [rows, setRows] = useState<PropertyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const reload = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      if (user) setRows((await fetchProperties()).filter(p => p.owner_id === user.id));
      else setRows([]);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Error al consultar'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void reload(); }, []);
  const remove = async (id: string) => {
    if (!userId || !window.confirm('¿Eliminar esta publicación?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', id).eq('owner_id', userId);
    if (error) toast.error(error.message); else { toast.success('Publicación eliminada'); void reload(); }
  };
  return <main className="max-w-5xl mx-auto px-6 py-10 min-h-screen">
    <div className="flex justify-between items-center mb-8"><h1>Mis propiedades</h1><Link to="/host/add-property"><Button>Agregar propiedad</Button></Link></div>
    {loading ? <p>Cargando...</p> : !userId ? <p>Iniciá sesión para gestionar tus publicaciones.</p> : rows.length === 0 ? <p>No tenés propiedades publicadas todavía.</p> : <div className="space-y-4">{rows.map(p => <div key={p.id} className="rounded-lg border bg-white p-4 flex gap-4 items-center">
      {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover rounded" />}
      <div className="flex-1"><h2>{p.title}</h2><p>{p.city}, {p.country} · ${p.price}</p></div>
      <Link to={`/host/edit-property/${p.id}`}><Button variant="outline">Editar</Button></Link>
      <Button variant="destructive" onClick={() => void remove(p.id)}>Eliminar</Button>
    </div>)}</div>}
    <p className="mt-8"><Link to="/listings" className="text-blue-600">Ver todas las propiedades</Link></p>
  </main>;
}
