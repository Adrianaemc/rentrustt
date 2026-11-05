import { useEffect,useState } from 'react';
import { supabase } from '../../lib/supabase';
/** Solo recuentos de contratos del solicitante; no expone contratos privados de terceros. */
export function TenantRentalHistory({ proposalId }: { proposalId:string }) {
 const [data,setData]=useState<{completed:number;active:number}|null>(null);
 const [error,setError]=useState('');
 useEffect(()=>{let alive=true;supabase.rpc('get_proposal_tenant_history',{p_proposal_id:proposalId}).then(({data,error})=>{
 if(!alive)return;if(error)setError(error.message);else setData(data as {completed:number;active:number});
 });return()=>{alive=false}},[proposalId]);
 return <section className="rounded-lg border p-3 text-sm"><strong>Historial en RenTrust</strong>
 {error?<p className="text-xs text-gray-500">No disponible: {error}. Verificá el SQL V18.</p>:!data?<p className="text-xs">Consultando historial…</p>:<p>Alquileres finalizados: {data.completed||0} · Activos: {data.active||0}</p>}
 <p className="text-xs text-gray-500">Solo contratos registrados en RenTrust. No incluye antecedentes externos.</p></section>;
}
