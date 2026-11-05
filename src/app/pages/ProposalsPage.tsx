import { ProposalDetailsDialog } from '../components/ProposalDetailsDialog';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { MessageSquare, Send, Home } from 'lucide-react';

type Proposal = {
  id: string;
  property_id: string;
  owner_id: string;
  tenant_id: string;
  message: string;
  status: string;
  created_at: string;
  properties?: { title: string; city: string; images: string[]; price: number } | null;
};
type ChatMessage = { id: string; sender_id: string; body: string; created_at: string };
type ContractSummary = { id: string; status: string };

export function ProposalsPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<Proposal[]>([]);
  const [detailProposal,setDetailProposal]=useState<Proposal|null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rent, setRent] = useState('');
  const [initialPayment, setInitialPayment] = useState('');
  const [contracts, setContracts] = useState<Record<string, ContractSummary>>({});
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      setUserId(user?.id || '');
      if (authError || !user) {
        if (authError) toast.error(authError.message);
        setItems([]);
        setContracts({});
        return;
      }
      const { data, error } = await supabase.from('rental_proposals')
        .select('id,property_id,owner_id,tenant_id,message,status,created_at,properties(title,city,images,price)')
        .or(`owner_id.eq.${user.id},tenant_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      if (error) toast.error(error.message);
      setItems((data || []) as unknown as Proposal[]);

      const { data: contractRows, error: contractsError } = await supabase
        .from('rental_contracts')
        .select('id,proposal_id,status');
      if (contractsError) console.warn('No se pudieron cargar contratos:', contractsError);
      setContracts(Object.fromEntries(
        (contractRows || []).map((c: { id: string; proposal_id: string; status: string }) =>
          [c.proposal_id, { id: c.id, status: c.status }]
        )
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  useEffect(() => {
    if (!selected) { setMessages([]); return; }
    let active = true;
    const read = async () => {
      const { data, error } = await supabase.from('proposal_messages')
        .select('id,sender_id,body,created_at')
        .eq('proposal_id', selected)
        .order('created_at');
      if (active) {
        if (error) toast.error(error.message);
        setMessages(data || []);
      }
    };
    void read();
    const timer = window.setInterval(() => void read(), 6000);
    return () => { active = false; window.clearInterval(timer); };
  }, [selected]);

  const changeStatus = async (p: Proposal, status: 'accepted' | 'rejected' | 'cancelled') => {
    setBusy(true);
    try {
      const { error } = await supabase.from('rental_proposals').update({ status }).eq('id', p.id);
      if (error) toast.error(error.message);
      else { toast.success('Estado actualizado'); await load(); }
    } finally {
      setBusy(false);
    }
  };

  const formalize = async (p: Proposal) => {
    const monthlyRent = Number(rent);
    const paymentAmount = Number(initialPayment);
    if (!startDate || !endDate || !rent.trim() || !initialPayment.trim() ||
        !Number.isFinite(monthlyRent) || !Number.isFinite(paymentAmount) ||
        monthlyRent <= 0 || paymentAmount <= 0 || endDate <= startDate) {
      toast.error('Completá fechas válidas y montos mayores que cero.');
      return;
    }
    if (p.owner_id !== userId || p.status !== 'accepted') {
      toast.error('Solo el propietario puede crear un contrato para una propuesta aceptada.');
      return;
    }

    setBusy(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || user?.id !== p.owner_id) {
        toast.error('La sesión no corresponde al propietario de esta propuesta.');
        return;
      }

      const terms = `CONTRATO DE LOCACIÓN DE INMUEBLE — RENTRUST

En la fecha de aceptación electrónica, las partes identificadas en la plataforma RenTrust acuerdan celebrar el presente contrato de locación respecto del inmueble y bajo las condiciones que se indican a continuación.

PRIMERA — PARTES. LOCADOR/A: usuario identificado como ${p.owner_id}. LOCATARIO/A: usuario identificado como ${p.tenant_id}. La identificación y los datos de contacto de cada parte constan en sus respectivos perfiles de RenTrust.

SEGUNDA — INMUEBLE. El inmueble objeto de la locación es «${p.properties?.title || 'Inmueble registrado'}», identificado en la plataforma con el código ${p.property_id}. El destino acordado es habitacional, salvo pacto expreso distinto entre las partes.

TERCERA — PLAZO. La locación comenzará el ${startDate} y finalizará el ${endDate}. Cualquier prórroga deberá acordarse expresamente y quedar registrada por las partes.

CUARTA — CANON LOCATIVO. El alquiler mensual convenido es de ARS ${monthlyRent.toLocaleString('es-AR')}. La fecha de vencimiento mensual y la modalidad de actualización, de corresponder, deberán ser acordadas y documentadas por las partes antes del inicio de la ocupación.

QUINTA — PAGO INICIAL. Las partes acuerdan un pago inicial de ARS ${paymentAmount.toLocaleString('es-AR')}. En esta versión de RenTrust, la acreditación del pago se representa mediante una operación de prueba, sin transferencia de fondos.

SEXTA — ENTREGA Y CONSERVACIÓN. El inmueble deberá entregarse en las condiciones descriptas en su publicación y en el inventario que las partes acuerden. La persona locataria se compromete a darle un uso adecuado y a informar oportunamente los desperfectos relevantes.

SÉPTIMA — SERVICIOS Y EXPENSAS. La distribución de servicios, expensas y demás gastos se establecerá en la documentación complementaria acordada entre las partes. Ningún importe no informado en este contrato se presumirá automáticamente aceptado.

OCTAVA — REPARACIONES. Las partes comunicarán los incidentes o reparaciones mediante los canales disponibles en RenTrust, conservando un registro de cada solicitud y su estado.

NOVENA — FINALIZACIÓN Y RESTITUCIÓN. Al finalizar el plazo o ante una terminación acordada, las partes dejarán constancia de la devolución del inmueble, el estado de entrega y los importes pendientes, si los hubiere.

DÉCIMA — ACEPTACIÓN. Ambas partes deben leer y aceptar la misma versión de este documento desde sus respectivas cuentas. RenTrust registra la fecha y hora de cada aceptación y el estado del contrato. Una vez registradas ambas aceptaciones y el pago inicial de prueba, el contrato pasa a estado activo.

ANEXO DE CONDICIONES PARTICULARES. Las partes podrán acordar por separado inventario, depósito, garantías, actualización del canon y distribución detallada de gastos. Tales condiciones deben incorporarse expresamente antes de considerar completo el acuerdo.

Documento de práctica para el flujo de contratación de RenTrust. Los datos de pago ingresados en la demostración no se procesan ni generan cargos.`;

      const { data, error } = await supabase.rpc('create_rental_contract', {
        p_proposal_id: p.id,
        p_start_date: startDate,
        p_end_date: endDate,
        p_monthly_rent: monthlyRent,
        p_initial_payment_amount: paymentAmount,
        p_terms_text: terms,
      });

      if (error) {
        console.error('Error al crear contrato:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        toast.error(`No se pudo crear el contrato: ${error.message}`);
        return;
      }

      toast.success('Contrato creado. Ahora deben firmarlo ambas partes.');
      setStartDate('');
      setEndDate('');
      setRent('');
      setInitialPayment('');
      await load();
      navigate(`/contracts/${data}`);
    } catch (err) {
      console.error('Error inesperado al formalizar:', err);
      toast.error('Ocurrió un error inesperado al registrar el contrato.');
    } finally {
      setBusy(false);
    }
  };

  const send = async () => {
    if (!selected || !body.trim() || !userId) return;
    setBusy(true);
    try {
      const { error } = await supabase.from('proposal_messages')
        .insert({ proposal_id: selected, sender_id: userId, body: body.trim() });
      if (error) toast.error(error.message);
      else {
        setBody('');
        const { data } = await supabase.from('proposal_messages')
          .select('id,sender_id,body,created_at')
          .eq('proposal_id', selected)
          .order('created_at');
        setMessages(data || []);
      }
    } finally {
      setBusy(false);
    }
  };

  return <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
    <div><h1 className="text-3xl font-semibold text-gray-900">Mis propuestas y mensajes</h1><p className="text-gray-600 mt-2">Gestioná las solicitudes de alquiler y conversá con la otra parte.</p></div>
    {!userId && !loading && <Card className="p-6">Iniciá sesión para consultar tus propuestas.</Card>}
    {loading && <p>Cargando propuestas...</p>}
    {!loading && userId && items.length === 0 && <Card className="p-8 text-center"><Home className="mx-auto mb-3 text-gray-400"/>Todavía no tenés propuestas. <Link className="text-blue-600 underline" to="/listings">Explorar propiedades</Link></Card>}
    <ProposalDetailsDialog proposal={detailProposal} open={!!detailProposal} onOpenChange={open=>{if(!open)setDetailProposal(null)}}/>
    <div className="grid md:grid-cols-2 gap-5"><div className="space-y-3">{items.map(p => <Card key={p.id} className="p-4 space-y-3">
      <div className="flex gap-3"><img className="w-20 h-20 rounded object-cover bg-gray-100" src={p.properties?.images?.[0] || ''} alt="Propiedad"/><div className="flex-1"><Link to={`/property/${p.property_id}`} className="font-semibold hover:underline">{p.properties?.title || 'Propiedad'}</Link><p className="text-sm text-gray-500">{p.properties?.city || ''}</p><Badge>{({ pending: 'Pendiente', accepted: 'Aceptada', rejected: 'Rechazada', cancelled: 'Cancelada' } as Record<string,string>)[p.status] || p.status}</Badge><p className="text-xs text-gray-500 mt-1">{p.owner_id === userId ? 'Propuesta recibida' : 'Propuesta enviada'}</p></div></div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{p.message}</p>
      <div className="flex flex-wrap gap-2">{p.owner_id===userId&&<Button variant="outline" size="sm" onClick={()=>setDetailProposal(p)}>Ver detalle</Button>}<Button variant="outline" size="sm" onClick={() => setSelected(p.id)}><MessageSquare className="w-4 h-4 mr-1"/>Mensajes</Button>
      {p.owner_id === userId && p.status === 'pending' && <><Button size="sm" disabled={busy} onClick={() => void changeStatus(p, 'accepted')}>Aceptar</Button><Button size="sm" variant="destructive" disabled={busy} onClick={() => void changeStatus(p, 'rejected')}>Rechazar</Button></>}
      {p.tenant_id === userId && p.status === 'pending' && <Button size="sm" variant="outline" disabled={busy} onClick={() => void changeStatus(p, 'cancelled')}>Cancelar</Button>}</div>
      {contracts[p.id] && <Link className="text-blue-700 underline text-sm block" to={`/contracts/${contracts[p.id].id}`}>Ver contrato · {contracts[p.id].status === 'formalizing' ? 'Firmas y pago pendientes' : contracts[p.id].status === 'active' ? 'Activo' : contracts[p.id].status}</Link>}
      {p.owner_id === userId && p.status === 'accepted' && !contracts[p.id] && <div className="border-t pt-3 space-y-2"><p className="text-sm font-semibold">Formalizar alquiler aceptado</p><p className="text-xs text-gray-500">Registrar fechas e importe. Este registro no equivale a firma digital.</p><div className="grid grid-cols-2 gap-2"><label className="text-xs">Inicio<Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/></label><label className="text-xs">Fin<Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/></label></div><Input type="number" min="1" placeholder="Alquiler mensual en ARS" value={rent} onChange={e => setRent(e.target.value)}/><Input type="number" min="1" placeholder="Pago inicial acordado en ARS" value={initialPayment} onChange={e => setInitialPayment(e.target.value)}/><Button size="sm" disabled={busy} onClick={() => void formalize(p)}>Crear contrato para firmar</Button></div>}
    </Card>)}</div>
    <div>{selected && items.some(p => p.id === selected) ? <Card className="p-5 space-y-4 md:sticky md:top-24"><h2 className="text-xl font-semibold">Conversación</h2><div className="h-80 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-3">{messages.length === 0 && <p className="text-sm text-gray-500">Todavía no hay mensajes.</p>}{messages.map(m => <div key={m.id} className={`p-3 rounded-lg max-w-[90%] ${m.sender_id === userId ? 'ml-auto bg-blue-100' : 'bg-white border'}`}><p className="text-sm whitespace-pre-wrap">{m.body}</p><p className="text-xs text-gray-500 mt-1">{new Date(m.created_at).toLocaleString('es-AR')}</p></div>)}</div><Textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Escribí un mensaje..."/><Button onClick={() => void send()} disabled={busy || !body.trim()}><Send className="w-4 h-4 mr-2"/>Enviar</Button></Card> : <Card className="p-8 text-center text-gray-500">Elegí «Mensajes» en una propuesta para abrir la conversación.</Card>}</div></div>
  </div>;
}
