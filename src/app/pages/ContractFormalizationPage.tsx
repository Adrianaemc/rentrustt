import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { FileText, LockKeyhole, Printer, CreditCard, CheckCircle } from 'lucide-react';

type Contract = { id:string; owner_id:string; tenant_id:string; property_id:string; status:string; start_date:string; end_date:string; monthly_rent:number; initial_payment_amount:number; terms_text:string; terms_version:number; owner_signed_at:string|null; tenant_signed_at:string|null; payment_status:string; payment_confirmed_at:string|null; properties?:{title:string}|null };
export function ContractFormalizationPage(){
 const {id}=useParams(); const [contract,setContract]=useState<Contract|null>(null); const [userId,setUserId]=useState(''); const [loading,setLoading]=useState(true); const [busy,setBusy]=useState(false); const [accepted,setAccepted]=useState(false); const [method,setMethod]=useState<'card'|'mp'>('card'); const [cardName,setCardName]=useState(''); const [cardNumber,setCardNumber]=useState(''); const [expiry,setExpiry]=useState(''); const [securityCode,setSecurityCode]=useState('');
 const load=async()=>{setLoading(true);const {data:{user}}=await supabase.auth.getUser();setUserId(user?.id||'');if(!user||!id){setLoading(false);return;}
  const {data,error}=await supabase.from('rental_contracts').select('*,properties(title)').eq('id',id).maybeSingle();
  if(error)toast.error(error.message);setContract(data as Contract|null);setLoading(false);};
 useEffect(()=>{void load()},[id]);
 const sign=async()=>{if(!contract||!accepted)return;setBusy(true);const {error}=await supabase.rpc('sign_rental_contract',{p_contract_id:contract.id,p_terms_version:contract.terms_version});if(error)toast.error(error.message);else{toast.success('Aceptación electrónica registrada');setAccepted(false);await load();}setBusy(false)};
 const pay=async()=>{
  if(!contract || userId!==contract.tenant_id || !contract.owner_signed_at || !contract.tenant_signed_at)return;
  if(method==='card'){
   const digits=cardNumber.replace(/\D/g,'');
   if(!cardName.trim() || digits.length!==16 || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) || !/^\d{3,4}$/.test(securityCode)){
    toast.error('Completá el nombre, los 16 dígitos, vencimiento MM/AA y código de seguridad de prueba.');return;
   }
  }
  setBusy(true);
  const {error}=await supabase.rpc('simulate_initial_payment',{p_contract_id:contract.id});
  if(error)toast.error(error.message);
  else {toast.success(method==='mp'?'Pago Mercado Pago simulado correctamente':'Pago con tarjeta simulado correctamente');setCardNumber('');setSecurityCode('');setExpiry('');setCardName('');await load();}
  setBusy(false);
 };
 if(loading)return <main className="max-w-4xl mx-auto px-4 py-10">Cargando contrato...</main>;
 if(!userId||!contract)return <main className="max-w-4xl mx-auto px-4 py-10"><Card className="p-6">Iniciá sesión con una cuenta participante para ver este contrato. <Link to="/proposals" className="underline text-blue-600">Volver a propuestas</Link></Card></main>;
 const participant=userId===contract.owner_id||userId===contract.tenant_id;
 if(!participant)return <main className="max-w-4xl mx-auto px-4 py-10">No tenés acceso a este contrato.</main>;
 const mySigned=userId===contract.owner_id?contract.owner_signed_at:contract.tenant_signed_at;
 const bothSigned=Boolean(contract.owner_signed_at&&contract.tenant_signed_at);
 return <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
  <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-semibold">Contrato de alquiler</h1><p className="text-gray-600">{contract.properties?.title||'Propiedad'} · Formalización del alquiler</p></div><Badge>{contract.status==='active'?'Activo':contract.status==='formalizing'?'En formalización':contract.status}</Badge></div>
  <p className="text-sm text-gray-500"><LockKeyhole className="w-4 h-4 inline mr-1"/>Operaciones de pago de prueba, sin cargos.</p>
  <Card className="p-6 space-y-4 print:shadow-none"><div className="flex items-center gap-2"><FileText className="text-blue-600"/><h2 className="text-xl font-semibold">Documento para revisar y aceptar</h2></div><p className="text-xs text-gray-500">Versión {contract.terms_version} · Contrato {contract.id}</p><pre className="whitespace-pre-wrap font-sans leading-7 text-sm bg-gray-50 p-4 rounded-lg border">{contract.terms_text}</pre><div className="grid sm:grid-cols-2 gap-3 text-sm"><p><strong>Firma propietario:</strong> {contract.owner_signed_at?new Date(contract.owner_signed_at).toLocaleString('es-AR'):'Pendiente'}</p><p><strong>Firma inquilino:</strong> {contract.tenant_signed_at?new Date(contract.tenant_signed_at).toLocaleString('es-AR'):'Pendiente'}</p></div><Button variant="outline" onClick={()=>window.print()}><Printer className="w-4 h-4 mr-2"/>Imprimir / guardar PDF desde el navegador</Button></Card>
  <Card className="p-6 space-y-4"><h2 className="font-semibold text-lg">1. Aceptación electrónica de ambas partes</h2><p className="text-sm text-gray-600">Cada participante debe ingresar a su cuenta y aceptar el mismo texto del contrato.</p><div className="flex flex-wrap gap-3"><Badge>{contract.owner_signed_at?'Propietario: firmado':'Propietario: pendiente'}</Badge><Badge>{contract.tenant_signed_at?'Inquilino: firmado':'Inquilino: pendiente'}</Badge></div>{contract.status==='formalizing'&&!mySigned&&<><label className="flex gap-2 text-sm items-start"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-1"/>Leí el contrato completo y acepto electrónicamente esta versión de las condiciones.</label><Button disabled={!accepted||busy} onClick={()=>void sign()}><CheckCircle className="w-4 h-4 mr-2"/>Firmar electrónicamente</Button></>}{mySigned&&<p className="text-green-700 text-sm">Tu aceptación quedó registrada en Supabase.</p>}</Card>
  <Card className="p-6 space-y-4"><h2 className="font-semibold text-lg">2. Pago inicial obligatorio</h2><p className="text-2xl font-semibold">ARS {Number(contract.initial_payment_amount||0).toLocaleString('es-AR')}</p><p className="text-sm text-gray-600">Estado: {contract.payment_status==='simulated_confirmed'?'Pago confirmado':'Pendiente'}</p>{contract.status==='formalizing'&&<>{!bothSigned&&<p className="text-amber-700 text-sm">Primero deben firmar ambas partes.</p>}{bothSigned&&userId!==contract.tenant_id&&<p className="text-sm">Esperando el pago de prueba del inquilino.</p>}{bothSigned&&userId===contract.tenant_id&&<div className="space-y-4 rounded-xl border p-4 bg-gray-50">
  <h3 className="font-medium">Elegí cómo pagar</h3>
  <div className="grid sm:grid-cols-2 gap-3">
   <button type="button" onClick={()=>setMethod('card')} className={`rounded-lg border p-3 text-left ${method==='card'?'border-blue-600 bg-blue-50':'bg-white'}`}><CreditCard className="inline w-4 h-4 mr-2"/>Tarjeta de débito o crédito</button>
   <button type="button" onClick={()=>setMethod('mp')} className={`rounded-lg border p-3 text-left ${method==='mp'?'border-blue-600 bg-blue-50':'bg-white'}`}>Mercado Pago</button>
  </div>
  {method==='card'?<div className="grid sm:grid-cols-2 gap-3">
    <label className="text-sm sm:col-span-2">Nombre del titular<input className="mt-1 w-full rounded-md border p-2" autoComplete="off" placeholder="Nombre de prueba" value={cardName} onChange={e=>setCardName(e.target.value)}/></label>
    <label className="text-sm sm:col-span-2">Número de tarjeta<input className="mt-1 w-full rounded-md border p-2" inputMode="numeric" autoComplete="off" maxLength={19} placeholder="4242 4242 4242 4242" value={cardNumber} onChange={e=>setCardNumber(e.target.value.replace(/[^\d ]/g,''))}/></label>
    <label className="text-sm">Vencimiento<input className="mt-1 w-full rounded-md border p-2" placeholder="MM/AA" maxLength={5} autoComplete="off" value={expiry} onChange={e=>setExpiry(e.target.value)}/></label>
    <label className="text-sm">Código de seguridad<input className="mt-1 w-full rounded-md border p-2" placeholder="123" type="password" inputMode="numeric" maxLength={4} autoComplete="off" value={securityCode} onChange={e=>setSecurityCode(e.target.value.replace(/\D/g,''))}/></label>
   </div>:<div className="rounded-lg bg-sky-50 p-4 text-sm"><strong>Mercado Pago</strong><p>Vas a confirmar un pago de prueba dentro de RenTrust. No se abre una pasarela externa.</p></div>}
  <p className="text-xs text-gray-500">Usá únicamente datos ficticios. Los campos de tarjeta no se guardan ni se envían a Supabase.</p>
  <Button disabled={busy} onClick={()=>void pay()}><CreditCard className="w-4 h-4 mr-2"/>Confirmar pago de prueba · ARS {Number(contract.initial_payment_amount||0).toLocaleString('es-AR')}</Button>
 </div>}</>}{contract.status==='active'&&<p className="text-green-700">Contrato activo. Ambas partes aceptaron y se registró el pago inicial de prueba.</p>}</Card>
  <Link className="text-blue-700 underline" to="/proposals">Volver a mis propuestas</Link>
 </main>;
}
