import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
type Payment={id:string;period:string;due_date:string;amount:number;status:string;paid_at:string|null;method:string|null};
export function RentalPaymentsPanel({contractId,readOnly=false}:{contractId:string;readOnly?:boolean}){
 const [items,setItems]=useState<Payment[]>([]);const [tenant,setTenant]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [method,setMethod]=useState('card');const [all,setAll]=useState(false);
 const load=async()=>{
  const {data:{user}}=await supabase.auth.getUser();
  const {data:c}=await supabase.from('rental_contracts').select('tenant_id,status').eq('id',contractId).single();
  setTenant(Boolean(user&&c?.tenant_id===user.id));
  if(c?.status==='active'||c?.status==='completed'){
   const r=await supabase.rpc('generate_rental_installments',{p_contract_id:contractId});if(r.error){setError(r.error.message);return;}
  }
  const r=await supabase.from('rental_monthly_payments').select('id,period,due_date,amount,status,paid_at,method').eq('contract_id',contractId).order('period',{ascending:false});
  setError(r.error?.message||'');setItems((r.data||[]) as Payment[]);
 };
 useEffect(()=>{void load()},[contractId]);
 const pay=async(id:string,approved:boolean)=>{
  setBusy(true);const r=await supabase.rpc('simulate_monthly_payment',{p_payment_id:id,p_method:method,p_approved:approved});
  if(r.error)toast.error(r.error.message);else toast[approved?'success':'warning'](approved?'Pago de demostración registrado':'Pago rechazado: la cuota continúa pendiente');
  await load();setBusy(false);
 };
 const visible=all?items:items.slice(0,5);
 return <section className="mt-4 rounded-xl border bg-white p-4 space-y-3"><div className="flex flex-wrap justify-between items-center gap-2"><h4 className="font-semibold">Cuotas e historial de pagos</h4><span className="text-xs text-gray-500">Operaciones simuladas, sin cargos reales</span></div>
  {error&&<p className="text-sm text-red-600">{error}. Revisá si ejecutaste SUPABASE_ETAPA8.sql.</p>}
  <div className="flex gap-3 text-sm"><span>{items.filter(p=>p.status==='paid').length} pagadas</span><span>{items.filter(p=>p.status==='pending').length} pendientes</span></div>
  {tenant&&!readOnly&&<label className="text-sm flex gap-2 items-center">Medio de pago <select className="border rounded p-1" value={method} onChange={e=>setMethod(e.target.value)}><option value="card">Tarjeta (simulación)</option><option value="mercadopago">Mercado Pago (simulación)</option></select></label>}
  <div className="max-h-96 overflow-y-auto divide-y">{visible.map(p=><div key={p.id} className="py-3 flex flex-wrap items-center justify-between gap-2"><div><p className="font-medium">{new Date(`${p.period}T12:00:00`).toLocaleDateString('es-AR',{month:'long',year:'numeric'})} · ARS {Number(p.amount).toLocaleString('es-AR')}</p><p className="text-xs text-gray-500">Vence {p.due_date}{p.paid_at?` · Pagado ${new Date(p.paid_at).toLocaleDateString('es-AR')}`:''}{p.method?` · ${p.method==='card'?'Tarjeta':'Mercado Pago'}`:''}</p></div><div className="flex flex-wrap items-center gap-2"><Badge className={p.status==='paid'?'bg-green-600':'bg-amber-500'}>{p.status==='paid'?'Pagado':'Pendiente'}</Badge>{tenant&&!readOnly&&p.status==='pending'&&<><Button disabled={busy} size="sm" onClick={()=>void pay(p.id,true)}>Simular pago</Button><Button disabled={busy} variant="outline" size="sm" onClick={()=>void pay(p.id,false)}>Simular rechazo</Button></>}</div></div>)}</div>
  {items.length>5&&<Button size="sm" variant="outline" onClick={()=>setAll(v=>!v)}>{all?'Ver menos':`Ver historial completo (${items.length})`}</Button>}
 </section>;
}
