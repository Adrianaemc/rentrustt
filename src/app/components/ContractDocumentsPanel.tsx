import { RentalFilesPanel } from './RentalFilesPanel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { FileText, Printer, CreditCard, CheckCircle } from 'lucide-react';

type RecordData = { id:string; terms_text:string|null; terms_version:number|null; owner_signed_at:string|null; tenant_signed_at:string|null; payment_status:string|null; payment_confirmed_at:string|null; initial_payment_amount:number|null; status:string };
export function ContractDocumentsPanel({contractId,readOnly=false}:{contractId:string;readOnly?:boolean}){
 const [record,setRecord]=useState<RecordData|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 useEffect(()=>{let alive=true;setLoading(true);setError('');void supabase.from('rental_contracts').select('id,terms_text,terms_version,owner_signed_at,tenant_signed_at,payment_status,payment_confirmed_at,initial_payment_amount,status').eq('id',contractId).maybeSingle().then(({data,error})=>{if(!alive)return;setRecord(data as RecordData|null);setError(error?.message||'');setLoading(false)});return()=>{alive=false}},[contractId]);
 if(loading)return <p className="text-sm text-gray-500 py-3">Cargando documentos...</p>;
 if(error)return <p className="text-sm text-red-600 py-3">No se pudieron cargar los documentos: {error}</p>;
 if(!record)return <p className="text-sm text-gray-500 py-3">No se encontró el contrato.</p>;
 return <div className="space-y-3 rounded-xl border bg-white p-4">
  <h4 className="font-semibold text-gray-900">Documentos y comprobantes del alquiler</h4>
  <Card className="p-4 flex flex-wrap justify-between items-center gap-3"><div className="flex gap-3 items-start"><FileText className="text-blue-600 h-5 w-5 mt-1"/><div><p className="font-medium">Contrato de alquiler · Versión {record.terms_version||1}</p><p className="text-xs text-gray-500">{record.owner_signed_at?'Propietario firmó':'Firma propietario pendiente'} · {record.tenant_signed_at?'Inquilino firmó':'Firma inquilino pendiente'}</p></div></div><Link to={`/contracts/${contractId}`}><Button size="sm" variant="outline"><Printer className="h-4 w-4 mr-1"/>Ver / guardar PDF</Button></Link></Card>
  <Card className="p-4 flex flex-wrap justify-between items-center gap-3"><div className="flex gap-3 items-start"><CreditCard className="text-blue-600 h-5 w-5 mt-1"/><div><p className="font-medium">Registro del pago inicial</p><p className="text-xs text-gray-500">{record.payment_status==='simulated_confirmed'?`Confirmado (simulación) · ARS ${Number(record.initial_payment_amount||0).toLocaleString('es-AR')}`:'Aún no confirmado'}{record.payment_confirmed_at?` · ${new Date(record.payment_confirmed_at).toLocaleDateString('es-AR')}`:''}</p></div></div>{record.payment_status==='simulated_confirmed'&&<CheckCircle className="h-5 w-5 text-green-600"/>}</Card>
  <RentalFilesPanel contractId={contractId} readOnly={readOnly}/>
 </div>;
}
