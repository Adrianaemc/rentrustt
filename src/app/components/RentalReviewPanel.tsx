import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from './ui/button';
import { toast } from 'sonner';

type Review = { id: string; reviewer_id: string; reviewed_id: string; rating: number; comment: string; created_at: string };
type Contract = { owner_id: string; tenant_id: string; status: string };

export function RentalReviewPanel({ contractId }: { contractId: string }) {
  const [userId, setUserId] = useState('');
  const [contract, setContract] = useState<Contract | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) { setError('Iniciá sesión para calificar.'); setLoading(false); return; }
    setUserId(user.id);
    const [c, r] = await Promise.all([
      supabase.from('rental_contracts').select('owner_id,tenant_id,status').eq('id', contractId).single(),
      supabase.from('rental_reviews').select('id,reviewer_id,reviewed_id,rating,comment,created_at').eq('contract_id', contractId).order('created_at', { ascending: true }),
    ]);
    setContract(c.data as Contract | null);
    setReviews((r.data || []) as Review[]);
    setError(c.error?.message || r.error?.message || '');
    setLoading(false);
  };

  useEffect(() => { void load(); }, [contractId]);
  const isOwner = !!contract && contract.owner_id === userId;
  const isTenant = !!contract && contract.tenant_id === userId;
  const isParty = isOwner || isTenant;
  const otherId = isOwner ? contract?.tenant_id : isTenant ? contract?.owner_id : '';
  const myReview = reviews.find(r => r.reviewer_id === userId);
  const ownerReview = reviews.find(r => r.reviewer_id === contract?.owner_id);
  const tenantReview = reviews.find(r => r.reviewer_id === contract?.tenant_id);
  const canReview = !!contract && contract.status === 'pending_review' && isParty && !myReview;

  const save = async () => {
    if (!canReview || !otherId || busy) return;
    const clean = comment.trim();
    if (clean.length < 10) { toast.error('Escribí al menos 10 caracteres.'); return; }
    setBusy(true);
    const { error: insertError } = await supabase.from('rental_reviews').insert({
      contract_id: contractId, reviewer_id: userId, reviewed_id: otherId, rating, comment: clean,
    });
    if (insertError) toast.error(`No se pudo publicar: ${insertError.message}`);
    else { toast.success('Reseña publicada correctamente.'); setComment(''); await load(); window.dispatchEvent(new Event('focus')); }
    setBusy(false);
  };

  return <section className="mt-4 rounded-xl border bg-white p-4 space-y-3">
    <h4 className="font-semibold">Reseñas del alquiler</h4>
    {loading && <p className="text-sm text-gray-500">Cargando reseñas...</p>}
    {error && <p className="text-sm text-red-600">{error}</p>}
    {!loading && contract && <div className="rounded-lg bg-gray-50 p-3 text-sm space-y-1">
      <p>Propietario: <strong>{ownerReview ? '✓ Reseña publicada' : 'Pendiente de reseña'}</strong></p>
      <p>Inquilino: <strong>{tenantReview ? '✓ Reseña publicada' : 'Pendiente de reseña'}</strong></p>
      <p className="text-xs text-gray-600">{contract.status === 'completed' ? 'Alquiler finalizado.' : 'El alquiler se finalizará cuando ambas partes publiquen su reseña.'}</p>
    </div>}
    {reviews.map(r => <div key={r.id} className="border-b pb-2 text-sm">
      <p className="font-medium">{r.reviewer_id === contract?.owner_id ? 'Reseña del propietario' : r.reviewer_id === contract?.tenant_id ? 'Reseña del inquilino' : 'Reseña'}{r.reviewer_id === userId ? ' (tu reseña)' : ''} · {'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p>
      <p className="whitespace-pre-wrap">{r.comment}</p>
      <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleDateString('es-AR')}</p>
    </div>)}
    {!loading && !isParty && <p className="text-sm text-amber-700">Esta cuenta no corresponde al propietario ni al inquilino del contrato.</p>}
    {!loading && myReview && <p className="text-sm text-green-700">Ya publicaste tu reseña. Falta la otra parte si el contrato sigue pendiente.</p>}
    {canReview && <div className="space-y-2">
      <p className="text-sm font-medium">{isTenant ? 'Calificar al propietario' : 'Calificar al inquilino'}</p>
      <label className="text-sm">Calificación <select className="border rounded p-1 ml-2" value={rating} onChange={e => setRating(Number(e.target.value))}>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} estrellas</option>)}</select></label>
      <textarea className="w-full border rounded-lg p-2 text-sm" rows={3} maxLength={2000} placeholder="Contá tu experiencia (mínimo 10 caracteres)" value={comment} onChange={e => setComment(e.target.value)} />
      <p className="text-xs text-gray-500">{comment.trim().length}/2000 caracteres · mínimo 10 para publicar.</p>
      <Button disabled={busy || comment.trim().length < 10} onClick={() => void save()}>{busy ? 'Publicando...' : 'Publicar reseña'}</Button>
    </div>}
    {!loading && <Button variant="outline" size="sm" disabled={busy} onClick={() => void load()}>Actualizar estado</Button>}
  </section>;
}
