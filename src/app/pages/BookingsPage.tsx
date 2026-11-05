import { RentalPaymentsPanel } from '../components/RentalPaymentsPanel';
import { RentalReviewPanel } from '../components/RentalReviewPanel';
import { RentalIncidentsPanel } from '../components/RentalIncidentsPanel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ProposalChatInline } from '../components/ProposalChatInline';
import { ProposalCard } from '../components/ProposalCard';
import { ContractDocumentsPanel } from '../components/ContractDocumentsPanel';
import { MessageSquare, FileText, Calendar, CreditCard, Home } from 'lucide-react';
import { toast } from 'sonner';

type Property = {title:string; city?:string;address?:string;images?:string[]};
type Proposal = {id:string;property_id:string;owner_id:string;tenant_id:string;status:string;message:string;created_at:string;properties?:Property|null};
type Contract = {id:string;proposal_id:string;status:string;start_date:string;end_date:string;monthly_rent:number;payment_status?:string;properties?:Property|null};
const statusName:Record<string,string>={pending:'Pendiente',accepted:'Aceptada',rejected:'Rechazada',cancelled:'Cancelada',formalizing:'En formalización',active:'Vigente',pending_review:'Pendiente de reseñas',completed:'Finalizado'};
export function BookingsPage(){
  const [proposals,setProposals]=useState<Proposal[]>([]);
  const [contracts,setContracts]=useState<Contract[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [expanded,setExpanded]=useState<string|null>(null);
  const [contractPanel,setContractPanel]=useState<{id:string;section:string}|null>(null);
  const togglePanel=(id:string,section:string)=>setContractPanel(v=>v?.id===id&&v.section===section?null:{id,section});
  const [finishing,setFinishing]=useState(false);
  const [tab,setTab]=useState('active');
  const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      setLoading(true);
      const {data:{user},error:authError}=await supabase.auth.getUser();
      if(!alive)return;
      if(authError||!user){setError(authError?.message||'Iniciá sesión para consultar tus alquileres.');setLoading(false);return;}
      const [p,c]=await Promise.all([
        supabase.from('rental_proposals').select('id,property_id,owner_id,tenant_id,status,message,created_at,properties(title,city,address,images)').eq('tenant_id',user.id).order('created_at',{ascending:false}),
        supabase.from('rental_contracts').select('id,proposal_id,status,start_date,end_date,monthly_rent,payment_status,properties(title,city,address,images)').eq('tenant_id',user.id).order('start_date',{ascending:false})
      ]);
      if(!alive)return;
      setProposals((p.data||[]) as unknown as Proposal[]);
      setContracts((c.data||[]) as unknown as Contract[]);
      setError([p.error?.message,c.error?.message].filter(Boolean).join(' · '));
      setLoading(false);
    };
    void load();return()=>{alive=false};
  },[refresh]);
  const contractFor=(id:string)=>contracts.find(c=>c.proposal_id===id);
  const cancel=async(p:Proposal)=>{
    if(!window.confirm('¿Cancelar esta propuesta pendiente?'))return;
    const {error}=await supabase.from('rental_proposals').update({status:'cancelled'}).eq('id',p.id).eq('tenant_id',p.tenant_id).eq('status','pending');
    if(error)toast.error(error.message);else{toast.success('Propuesta cancelada');setRefresh(v=>v+1)};
  };
  const finish=async(id:string)=>{if(!window.confirm('¿Estás seguro de que querés finalizar este alquiler de forma anticipada? Esta acción cerrará el chat y la carga de documentos, y habilitará las reseñas.'))return;setFinishing(true);const r=await supabase.rpc('finish_rental_contract',{p_contract_id:id});if(r.error)toast.error(r.error.message);else{toast.success('Alquiler pendiente de ambas reseñas. Ya podés calificar a la otra parte.');setTab('reviews');togglePanel(id,'reviews');setRefresh(v=>v+1)}setFinishing(false)};
  const renderContract=(c:Contract)=> <Card key={c.id} className="overflow-hidden">
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-48 h-40 sm:h-40 shrink-0 overflow-hidden bg-gray-100">{c.properties?.images?.[0]&&<ImageWithFallback src={c.properties.images[0]} alt={c.properties?.title||'Propiedad'} className="w-full h-full object-cover"/>}</div>
      <div className="p-5 flex-1 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">{c.properties?.title||'Propiedad'}</h3><Badge className={c.status==='active'?'bg-green-600':c.status==='formalizing'?'bg-amber-500':'bg-gray-600'}>{statusName[c.status]||c.status}</Badge></div>
        <p className="text-sm text-gray-500">{[c.properties?.address,c.properties?.city].filter(Boolean).join(', ')}</p>
        <div className="text-sm flex flex-wrap gap-4"><span><Calendar className="inline h-4 w-4 mr-1"/>{c.start_date} — {c.end_date}</span><span>ARS {Number(c.monthly_rent).toLocaleString('es-AR')} / mes</span></div>
        <div className="flex flex-wrap gap-2"><Link to={`/contracts/${c.id}`}><Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2"/>Contrato y firmas</Button></Link>
          {c.proposal_id&&<Button variant="outline" size="sm" onClick={()=>togglePanel(c.id,'chat')}><MessageSquare className="h-4 w-4 mr-2"/>{c.status==='active'?'Chat del alquiler':'Historial del chat'}</Button>}
          <Button variant="outline" size="sm" onClick={()=>togglePanel(c.id,'documents')}><FileText className="h-4 w-4 mr-2"/>Documentos y comprobantes</Button>
          <Button variant="outline" size="sm" onClick={()=>togglePanel(c.id,'incidents')}>Incidencias</Button>
          {c.status!=='formalizing'&&<Button variant="outline" size="sm" onClick={()=>togglePanel(c.id,'payments')}>Cuotas y pagos</Button>}
          {['pending_review','completed'].includes(c.status)&&<Button variant="outline" size="sm" onClick={()=>togglePanel(c.id,'reviews')}>Calificar</Button>}
          {c.status==='active'&&<Button disabled={finishing} variant="outline" size="sm" onClick={()=>void finish(c.id)}>Finalizar alquiler</Button>}
          {c.status==='formalizing'&&<Link to={`/contracts/${c.id}`}><Button size="sm"><CreditCard className="h-4 w-4 mr-2"/>Continuar formalización</Button></Link>}
        </div>
        {contractPanel?.id===c.id&&contractPanel.section==='payments'&&<RentalPaymentsPanel contractId={c.id} readOnly={c.status!=='active'}/>}
        {contractPanel?.id===c.id&&contractPanel.section==='reviews'&&['pending_review','completed'].includes(c.status)&&<RentalReviewPanel contractId={c.id}/>}
        {contractPanel?.id===c.id&&contractPanel.section==='documents'&&<ContractDocumentsPanel contractId={c.id} readOnly={['pending_review','completed'].includes(c.status)||c.status==='cancelled'}/>}
        {contractPanel?.id===c.id&&contractPanel.section==='incidents'&&<RentalIncidentsPanel contractId={c.id} readOnly={['pending_review','completed','cancelled'].includes(c.status)}/>}
        {contractPanel?.id===c.id&&contractPanel.section==='chat'&&c.proposal_id&&<ProposalChatInline proposalId={c.proposal_id} readOnly={['pending_review','completed','cancelled'].includes(c.status)}/>}
      </div>
    </div>
  </Card>;
  const proposalCards=proposals.map(p=>{
    const c=contractFor(p.id);
    return <ProposalCard key={p.id} proposal={p} participantLabel="Propietario" expanded={expanded===p.id} onToggle={()=>setExpanded(v=>v===p.id?null:p.id)} actions={<>
      {p.status==='pending'&&<Button variant="outline" size="sm" onClick={()=>void cancel(p)}>Cancelar propuesta</Button>}
      {c&&<Link to={`/contracts/${c.id}`}><Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1"/>Ver contrato</Button></Link>}
    </>}>
      <ProposalChatInline proposalId={p.id} readOnly={p.status==='cancelled'}/>
    </ProposalCard>;
  });
  const active=contracts.filter(c=>c.status==='active');
  const formalizing=contracts.filter(c=>c.status==='formalizing');
  const finished=contracts.filter(c=>['completed','cancelled'].includes(c.status));
   const pendingReviews=contracts.filter(c=>c.status==='pending_review');
  return <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div><h1 className="text-2xl font-semibold text-gray-900">Mis alquileres</h1><p className="text-sm text-gray-600 mt-1">Gestioná tus propuestas, contratos y conversaciones en un solo lugar.</p></div>
    {error&&<Card className="p-4 text-red-600 text-sm">{error}</Card>}
    {loading?<Card className="p-8 text-center">Cargando tus alquileres...</Card>:
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6 flex flex-wrap h-auto justify-start">
        <TabsTrigger value="active">Contratos activos ({active.length})</TabsTrigger>
        <TabsTrigger value="formalizing">En formalización ({formalizing.length})</TabsTrigger>
        <TabsTrigger value="reviews">Pendientes de reseña ({pendingReviews.length})</TabsTrigger>
         <TabsTrigger value="finished">Finalizados ({finished.length})</TabsTrigger>
        <TabsTrigger value="proposals">Mis propuestas ({proposals.length}) {proposals.some(p=>p.status==='accepted'&&!contractFor(p.id))&&<span className="ml-1 w-2 h-2 bg-red-500 rounded-full"/>}</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="space-y-4">{active.length?active.map(renderContract):<Card className="p-8 text-center text-gray-500"><Home className="mx-auto mb-2"/>Todavía no tenés contratos activos.</Card>}</TabsContent>
      <TabsContent value="formalizing" className="space-y-4">{formalizing.length?formalizing.map(renderContract):<Card className="p-8 text-center text-gray-500">No hay contratos en formalización.</Card>}</TabsContent>
      <TabsContent value="reviews" className="space-y-4">{pendingReviews.length?pendingReviews.map(renderContract):<Card className="p-8">No tenés reseñas pendientes.</Card>}</TabsContent>
      <TabsContent value="finished" className="space-y-4">{finished.length?finished.map(renderContract):<Card className="p-8 text-center text-gray-500">Todavía no tenés alquileres finalizados.</Card>}</TabsContent>
      <TabsContent value="proposals" className="space-y-4 max-w-3xl"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Propuestas de alquiler</h2><p className="text-sm text-gray-500">Seguimiento de las solicitudes que enviaste</p></div><Badge className="bg-blue-600">{proposals.filter(p=>p.status==='pending').length} pendientes</Badge></div>{proposalCards.length?proposalCards:<Card className="p-8 text-center text-gray-500">Todavía no enviaste propuestas. <Link className="text-blue-600 underline" to="/listings">Explorar propiedades</Link></Card>}</TabsContent>
    </Tabs>}
  </div>;
}
