import { useEffect,useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription } from './ui/dialog';
import { Avatar,AvatarImage,AvatarFallback } from './ui/avatar';
import { TenantRentalHistory } from './TenantRentalHistory';
import { SimulatedCreditCheck } from './SimulatedCreditCheck';
type Detail={name?:string;cuit?:string;avatar?:string;rating?:number;comment?:string;created_at?:string};
export function ProposalDetailsDialog({proposal,open,onOpenChange}:{proposal:{id:string;tenant_id:string;status:string;message?:string;created_at?:string;properties?:{title?:string}|null}|null;open:boolean;onOpenChange:(open:boolean)=>void}){
 const [profile,setProfile]=useState<Detail|null>(null);const [reviews,setReviews]=useState<Detail[]>([]);const [error,setError]=useState('');
 useEffect(()=>{if(!open||!proposal)return;let alive=true;setProfile(null);setReviews([]);setError('');
 Promise.all([supabase.rpc('get_proposal_tenant_profile',{p_proposal_id:proposal.id}),supabase.rpc('get_public_rental_reputation',{p_user_id:proposal.tenant_id})]).then(([a,b])=>{
  if(!alive)return;if(a.error)setError(a.error.message);else setProfile(a.data as Detail);if(!b.error)setReviews((b.data||[]) as Detail[]);
 });return()=>{alive=false};},[open,proposal?.id]);
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="sm:max-w-[650px] max-h-[88vh] overflow-y-auto"><DialogHeader><DialogTitle>Detalle de la propuesta</DialogTitle><DialogDescription>Información del solicitante y seguimiento de su propuesta</DialogDescription></DialogHeader>
 {proposal&&<div className="space-y-4 text-sm"><div className="rounded-lg border p-4 space-y-2"><strong>{proposal.properties?.title||'Propiedad'}</strong><p>Estado: <span className="font-medium">{({pending:'Pendiente',accepted:'Aceptada',rejected:'Rechazada',cancelled:'Cancelada'} as Record<string,string>)[proposal.status]||proposal.status}</span></p><p>Recibida: {proposal.created_at?new Date(proposal.created_at).toLocaleString('es-AR'):'—'}</p><p className="whitespace-pre-wrap">{proposal.message||'Sin mensaje adicional'}</p></div>
 <div className="rounded-lg border p-4 space-y-3"><h3 className="font-semibold">Datos del inquilino</h3>{error&&<p className="text-amber-700">No se pudieron cargar los datos del perfil: {error}</p>}
 <div className="flex items-center gap-3"><Avatar className="w-14 h-14"><AvatarImage src={profile?.avatar||''}/><AvatarFallback>{profile?.name?.slice(0,2).toUpperCase()||'IN'}</AvatarFallback></Avatar><div><p className="font-medium">{profile?.name||'Inquilino'}</p><p className="text-gray-600">CUIT/CUIL: {profile?.cuit||'No informado'}</p></div></div></div>
 <TenantRentalHistory proposalId={proposal.id}/>
 <div className="rounded-lg border p-4 space-y-2"><h3 className="font-semibold">Calificaciones y reseñas</h3>{reviews.length?<><p>Promedio: {(reviews.reduce((a,r)=>a+Number(r.rating||0),0)/reviews.length).toFixed(1)} / 5 · {reviews.length} reseña(s)</p>{reviews.map((r,i)=><div key={i} className="border-t pt-2"><strong>{'★'.repeat(Math.min(5,Math.max(0,Number(r.rating||0))))}</strong><p className="text-gray-700">{r.comment||'Sin comentario'}</p></div>)}</>:<p className="text-gray-500">Todavía no hay reseñas publicadas.</p>}</div>
 <SimulatedCreditCheck proposalId={proposal.id} cuit={profile?.cuit||''}/>
 <div className="rounded-lg border p-3"><strong>Historial de estado</strong><p className="text-gray-600 mt-1">Creada: {proposal.created_at?new Date(proposal.created_at).toLocaleString('es-AR'):'—'}</p><p className="text-gray-600">Estado actual: {proposal.status}</p></div>
 </div>}</DialogContent></Dialog>;
}
