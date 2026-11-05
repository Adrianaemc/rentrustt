import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Review = { rating: number; comment: string; created_at: string };
export function VerifiedReputationPanel({ userId, role }: { userId: string; role: 'owner' | 'tenant' }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    supabase.rpc('get_public_rental_reputation', { p_user_id: userId }).then(({ data, error }) => {
      if (!mounted) return;
      setReviews((data || []) as Review[]);
      setError(error?.message || '');
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [userId]);
  const avg = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const positive = reviews.filter(review => review.rating >= 4).length;
  return <section className="rounded-xl border bg-white p-4 space-y-3 mt-4">
    <h3 className="font-semibold">Reputación verificada en RenTrust</h3>
    <p className="text-xs text-gray-500">Solo reseñas vinculadas a contratos con ambas calificaciones registradas. Estadísticas calculadas, no generadas por IA.</p>
    {loading ? <p>Cargando reputación...</p> : error ? <p className="text-red-600 text-sm">No se pudo consultar la reputación: {error}. Ejecutá el SQL V16.</p> : reviews.length === 0 ? <p className="text-sm text-gray-600">Todavía no hay antecedentes verificables.</p> : <>
      <p className="text-sm"><strong>{avg.toFixed(1)}/5 ★</strong> · {reviews.length} reseña(s) · {Math.round(positive / reviews.length * 100)}% de calificaciones de 4 o 5 estrellas</p>
      <p className="text-xs rounded bg-blue-50 p-2">Análisis descriptivo automático: {positive / reviews.length >= 0.8 ? "Predominan las experiencias positivas" : positive / reviews.length >= 0.5 ? "Opiniones mixtas con mayoría favorable" : "Se registran varias experiencias con baja valoración"}. Este resumen es estadístico, no generado por inteligencia artificial.</p>
      <p className="text-sm text-gray-600">{role === 'owner' ? 'Experiencias de inquilinos con este propietario.' : 'Experiencias de propietarios con este inquilino.'}</p>
      {reviews.map((r, i) => <div key={`${r.created_at}-${i}`} className="border-t pt-2 text-sm"><strong>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</strong><p className="whitespace-pre-wrap">{r.comment}</p><span className="text-xs text-gray-500">{new Date(r.created_at).toLocaleDateString('es-AR')}</span></div>)}
    </>}
  </section>;
}
