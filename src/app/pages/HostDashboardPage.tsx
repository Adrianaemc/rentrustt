import { ProposalDetailsDialog } from '../components/ProposalDetailsDialog';
import { TenantRentalHistory } from '../components/TenantRentalHistory';
import { SimulatedCreditCheck } from '../components/SimulatedCreditCheck';
import { RentalPaymentsPanel } from '../components/RentalPaymentsPanel';
import { RentalReviewPanel } from '../components/RentalReviewPanel';
import { RentalIncidentsPanel } from '../components/RentalIncidentsPanel';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ProposalChatInline } from '../components/ProposalChatInline';
import { ProposalCard } from '../components/ProposalCard';
import { ContractDocumentsPanel } from '../components/ContractDocumentsPanel';
import type { PropertyRecord } from '../../lib/properties';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import {
  PlusCircle,
  Home,
  DollarSign,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  User,
  ThumbsUp,
  AlertCircle,
  MessageSquare,
  FileText,
  Download,
  Upload,
  FolderOpen,
  Send,
} from 'lucide-react';

export function HostDashboardPage() {
  const [detailProposal,setDetailProposal]=useState<any|null>(null);
  const [savedProperties, setSavedProperties] = useState<PropertyRecord[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState('');
  const [currentOwnerId, setCurrentOwnerId] = useState<string | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      setPropertiesLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!alive) return;
      setCurrentOwnerId(user?.id ?? null);
      if (authError || !user) { setSavedProperties([]); setPropertiesError(authError?.message || 'Iniciá sesión para ver tus propiedades.'); setPropertiesLoading(false); return; }
      const { data, error } = await supabase.from('properties').select('*').eq('owner_id', user.id).order('created_at', { ascending: false });
      if (!alive) return;
      setSavedProperties((data || []) as PropertyRecord[]);
      setPropertiesError(error?.message || '');
      setPropertiesLoading(false);
    };
    void load();
    return () => { alive = false; };
  }, [reloadVersion]);
  const deleteProperty = async (id: string) => {
    if (!currentOwnerId || !window.confirm('¿Eliminar esta publicación?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', id).eq('owner_id', currentOwnerId);
    if (error) toast.error(error.message);
    else { toast.success('Propiedad eliminada'); setReloadVersion(v => v + 1); }
  };
  // Review state
  const [reviewOpen, setReviewOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [timelyPayments, setTimelyPayments] = useState('yes');
  const [propertyCondition, setPropertyCondition] = useState('excellent');
  const [petBehavior, setPetBehavior] = useState('good');
  const [hasPet, setHasPet] = useState('no');
  const [activeTab, setActiveTab] = useState('active-contracts');
  const [receivedProposals, setReceivedProposals] = useState<any[]>([]);
  const [proposalBusy, setProposalBusy] = useState(false);
  const [expandedProposal,setExpandedProposal]=useState<string|null>(null);
  const [contractPanel,setContractPanel]=useState<{id:string;section:string}|null>(null);
  const toggleContractPanel=(id:string,section:string)=>setContractPanel(v=>v?.id===id&&v.section===section?null:{id,section});
  const [finishing,setFinishing]=useState(false);
  const [finishedContracts, setFinishedContracts] = useState<any[]>([]);
  const [proposalContractIds, setProposalContractIds] = useState<Record<string,string>>({});
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // Contratos reales, sin ejemplos precargados.
  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [formalizingContracts,setFormalizingContracts]=useState<any[]>([]);
  useEffect(() => {
    if (!currentOwnerId) { setActiveContracts([]); setFinishedContracts([]); setReceivedProposals([]); return; }
    let alive = true;
    const loadContracts = async () => {
      const { data, error } = await supabase.from('rental_contracts')
        .select('id,proposal_id,tenant_id,property_id,start_date,end_date,monthly_rent,status,properties(title,address,city,images)')
        .eq('owner_id',currentOwnerId).in('status',['active','formalizing','pending_review','completed','cancelled']);
      if (error) { console.warn('No se pudieron cargar contratos:',error.message); return; }
      if (!alive) return;
      setProposalContractIds(Object.fromEntries((data||[]).filter((c:any)=>c.proposal_id).map((c:any)=>[c.proposal_id,c.id])));
      setFormalizingContracts((data||[]).filter((c:any)=>c.status==='formalizing'));
      const asCard=(c:any)=>({
        id:c.id, proposalId:c.proposal_id, tenant:{name:'Inquilino',email:'',avatar:''},
        property:c.properties?.title||'Propiedad',
        propertyAddress:[c.properties?.address,c.properties?.city].filter(Boolean).join(', '),
        propertyImage:c.properties?.images?.[0]||'',
        startDate:c.start_date,endDate:c.end_date,monthlyRent:Number(c.monthly_rent),status:c.status
      });
      setPendingReviewContracts((data||[]).filter((c:any)=>c.status==='pending_review').map(asCard));
       setFinishedContracts((data||[]).filter((c:any)=>['completed','cancelled'].includes(c.status)).map(asCard));
      setActiveContracts((data||[]).filter((c:any)=>c.status==='active').map((c:any)=>({
        id:c.id, proposalId:c.proposal_id, tenant:{name:'Inquilino',email:'',avatar:''},
        property:c.properties?.title||'Propiedad',
        propertyAddress:[c.properties?.address,c.properties?.city].filter(Boolean).join(', '),
        propertyImage:c.properties?.images?.[0]||'',
        startDate:c.start_date,endDate:c.end_date,monthlyRent:Number(c.monthly_rent),status:'Vigente'
      })));
    };
    const loadProposals=async()=>{
      const {data,error}=await supabase.from('rental_proposals').select('id,property_id,owner_id,tenant_id,message,status,created_at,properties(title,city,images)').eq('owner_id',currentOwnerId).order('created_at',{ascending:false});
      if(error){toast.error(error.message);return;}
      if(alive)setReceivedProposals(data||[]);
    };
    void loadContracts(); void loadProposals(); return ()=>{alive=false};
  },[currentOwnerId,reloadVersion]);

  const finishRental=async(id:string)=>{if(!window.confirm('¿Estás seguro de que querés finalizar este alquiler de forma anticipada? El chat y los documentos quedarán en modo consulta, y se habilitarán las reseñas.'))return;setFinishing(true);const r=await supabase.rpc('finish_rental_contract',{p_contract_id:id});if(r.error)toast.error(r.error.message);else{toast.success('Alquiler pendiente de ambas reseñas. Ya podés calificar al inquilino.');toggleContractPanel(id,'reviews');setReloadVersion(v=>v+1)}setFinishing(false)};

  const updateProposal=async(id:string,status:'accepted'|'rejected')=>{
    setProposalBusy(true);
    const {error}=await supabase.from('rental_proposals').update({status}).eq('id',id).eq('owner_id',currentOwnerId);
    if(error)toast.error(error.message); else {toast.success(status==='accepted'?'Propuesta aceptada':'Propuesta rechazada');setReloadVersion(v=>v+1);}
    setProposalBusy(false);
  };

  // No mostrar reseñas ficticias como reales.
  const [pendingReviewContracts, setPendingReviewContracts] = useState<any[]>([]);



  // Las propiedades provienen del usuario autenticado en Supabase.
  const myProperties = savedProperties.map(p => ({
    id: p.id,
    title: p.title,
    location: `${p.city}, ${p.country}`,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    monthlyRent: Number(p.price),
    image: p.images?.[0] || '',
    status: 'Disponible',
    currentTenant: null as string | null,
  }));

  const handleSubmitTenantReview = () => {
    if (!selectedContract) return;

    // Update the contract with owner's review
    const updatedContract = {
      ...selectedContract,
      ownerRating: reviewRating,
      ownerReviewSubmitted: true,
    };

    // Check if tenant has also submitted their review
    if (updatedContract.tenantReviewSubmitted) {
      // Both reviews completed - move to finished contracts
      setPendingReviewContracts(pendingReviewContracts.filter((c) => c.id !== selectedContract.id));
      toast.success('Reseña enviada. El contrato ha sido finalizado exitosamente');
    } else {
      // Only owner review submitted - keep in pending
      setPendingReviewContracts(
        pendingReviewContracts.map((contract) => (contract.id === selectedContract.id ? updatedContract : contract))
      );
      toast.success('Reseña enviada. Esperando reseña del inquilino para finalizar el contrato');
    }

    setReviewOpen(false);

    // Reset form
    setReviewRating(5);
    setReviewComment('');
    setTimelyPayments('yes');
    setPropertyCondition('excellent');
    setPetBehavior('good');
    setHasPet('no');
    setSelectedContract(null);
  };

  const stats = [
    {
      label: 'Total propiedades',
      value: myProperties.length,
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Alquileres activos',
      value: activeContracts.length,
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Ingresos mensuales',
      value: `$${activeContracts.reduce((sum, contract) => sum + contract.monthlyRent, 0)}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Ocupación',
      value: `${(myProperties.length ? Math.round((activeContracts.length / myProperties.length) * 100) : 0)}%`,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 dark:text-gray-100 mb-2">Mis Propiedades</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestiona tus propiedades y contratos de alquiler</p>
          </div>
          <Link to="/host/add-property">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar propiedad
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-gray-900 dark:text-gray-100 text-2xl">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} dark:bg-opacity-20 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color} dark:opacity-90`} />
                </div>
              </div>
            </Card>
          ))}
        </div>


        {/* Tabs for Active Contracts, Pending Reviews, Finished Contracts, and Properties */}
        <ProposalDetailsDialog proposal={detailProposal} open={!!detailProposal} onOpenChange={open=>{if(!open)setDetailProposal(null)}}/>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active-contracts">Contratos Activos ({activeContracts.length})</TabsTrigger>
            <TabsTrigger value="pending-contracts">Pendientes de reseñas ({pendingReviewContracts.length})</TabsTrigger>
            <TabsTrigger value="finished-contracts">Finalizados ({finishedContracts.length})</TabsTrigger>
            <TabsTrigger value="properties">Mis Propiedades ({myProperties.length})</TabsTrigger>
            <TabsTrigger value="proposals">Propuestas recibidas {receivedProposals.filter(p=>p.status==='pending').length>0 && <Badge className="ml-1 bg-red-500 text-white">{receivedProposals.filter(p=>p.status==='pending').length}</Badge>}</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-4">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold">Propuestas de alquiler</h2><p className="text-sm text-gray-500">Solicitudes recibidas para tus propiedades</p></div><Badge className="bg-red-500">{receivedProposals.filter(p=>p.status==='pending').length} pendientes</Badge></div>
            {receivedProposals.length===0 && <Card className="p-8 text-center text-gray-500">Todavía no recibiste propuestas.</Card>}
            <div className="space-y-3 max-w-3xl">
              {receivedProposals.map((p:any)=><ProposalCard key={p.id} proposal={p} participantLabel="Inquilino" expanded={expandedProposal===p.id} onToggle={()=>setExpandedProposal(v=>v===p.id?null:p.id)} actions={<>
                <Button variant="outline" size="sm" onClick={()=>setDetailProposal(p)}>Ver detalle</Button>
                {p.status==='pending' && <><Button disabled={proposalBusy} variant="outline" size="sm" onClick={()=>void updateProposal(p.id,'accepted')} className="text-green-700">Aceptar</Button><Button disabled={proposalBusy} variant="outline" size="sm" onClick={()=>void updateProposal(p.id,'rejected')} className="text-red-700">Rechazar</Button></>}
                {proposalContractIds[p.id] && <Link to={`/contracts/${proposalContractIds[p.id]}`}><Button size="sm" variant="outline"><FileText className="h-4 w-4 mr-1"/>Ver contrato</Button></Link>}
                {p.status==='accepted'&&!proposalContractIds[p.id] && <Link to={`/proposals?proposal=${p.id}`}><Button size="sm">Crear contrato</Button></Link>}
              </>}>
                <ProposalChatInline proposalId={p.id} readOnly={p.status==='cancelled'}/>
              </ProposalCard>)}
            </div>
            {formalizingContracts.length>0 && <><h3 className="font-semibold">Contratos en formalización</h3>{formalizingContracts.map((c:any)=><Card key={c.id} className="p-4 flex justify-between items-center gap-3"><span>{c.properties?.title||'Propiedad'} · Pendiente de firmas o pago</span><Link to={`/contracts/${c.id}`}><Button size="sm" variant="outline">Revisar contrato</Button></Link></Card>)}</>}
          </TabsContent>
          {/* Active Contracts Tab */}
          <TabsContent value="active-contracts" className="space-y-4">
            {activeContracts.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h2 className="text-gray-900 dark:text-gray-100 mb-2">No hay contratos activos</h2>
                <p className="text-gray-600 dark:text-gray-400">Tus contratos de alquiler vigentes aparecerán aquí</p>
              </div>
            ) : (
              activeContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden hover:shadow-lg transition-shadow border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/20">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                      <ImageWithFallback src={contract.propertyImage} alt={contract.property} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-gray-900 dark:text-gray-100">{contract.property}</h3>
                            <Badge className="bg-green-600">Vigente</Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{contract.propertyAddress}</p>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                              <ImageWithFallback src={contract.tenant.avatar} alt={contract.tenant.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900 dark:text-gray-100">{contract.tenant.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{contract.tenant.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Valor mensual actual</p>
                          <p className="text-gray-900 dark:text-gray-100 text-2xl">${contract.monthlyRent}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">Inicio de contrato</p>
                            <p className="text-gray-900 dark:text-gray-100">{new Date(contract.startDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">Fin de contrato</p>
                            <p className="text-gray-900 dark:text-gray-100">{new Date(contract.endDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t justify-end flex-wrap">
                        <Link to={`/contracts/${contract.id}`}><Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2"/>Ver contrato y firmas</Button></Link>
                        {contract.proposalId && <Button variant="outline" size="sm" onClick={()=>toggleContractPanel(contract.id,'chat')}><MessageSquare className="h-4 w-4 mr-2"/>Chat del alquiler</Button>}
                        <Button variant="outline" size="sm" onClick={()=>toggleContractPanel(contract.id,'incidents')}>Incidencias</Button>
                        <Button variant="outline" size="sm" onClick={()=>toggleContractPanel(contract.id,'docs')}><FolderOpen className="h-4 w-4 mr-2"/>Documentos</Button>
                        <Button variant="outline" size="sm" onClick={()=>toggleContractPanel(contract.id,'payments')}>Cuotas y pagos</Button>
                        <Button disabled={finishing} variant="outline" size="sm" onClick={()=>void finishRental(contract.id)}>Finalizar alquiler</Button>
                      </div>
                      {(contractPanel?.id===contract.id && contractPanel.section==='chat') && contract.proposalId && <div className="mt-4"><ProposalChatInline proposalId={contract.proposalId}/></div>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='docs') && <div className="mt-4"><ContractDocumentsPanel contractId={contract.id}/></div>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='incidents')&&<RentalIncidentsPanel contractId={contract.id}/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='payments')&&<RentalPaymentsPanel contractId={contract.id}/>}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Pending Reviews Tab */}
          <TabsContent value="pending-contracts" className="space-y-4">
            {pendingReviewContracts.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-gray-900 mb-2">No hay contratos pendientes de reseña</h2>
                <p className="text-gray-600">Los alquileres pendientes de ambas reseñas aparecerán aquí</p>
              </div>
            ) : (
              pendingReviewContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                      <ImageWithFallback src={contract.propertyImage} alt={contract.property} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-gray-900 mb-2">{contract.property}</h3>
                          <p className="text-gray-600 text-sm mb-3">{contract.propertyAddress}</p>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                              <ImageWithFallback src={contract.tenant.avatar} alt={contract.tenant.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">{contract.tenant.name}</p>
                              <p className="text-xs text-gray-500">{contract.tenant.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Link to={`/contracts/${contract.id}`}><Button size="sm" variant="outline">Contrato y registro</Button></Link>
                          {contract.proposalId && <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'chat')}>Historial del chat</Button>}
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'docs')}>Documentos</Button>
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'incidents')}>Incidencias</Button>
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'payments')}>Historial de pagos</Button>
                          {['pending_review','completed'].includes(contract.status)&&<Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'reviews')}>Calificar inquilino</Button>}
                          {contract.ownerRating && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs text-gray-500">Tu reseña</span>
                              <div className="flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4 fill-purple-600 text-purple-600" />
                                <span className="text-sm text-purple-900">{contract.ownerRating}</span>
                              </div>
                            </div>
                          )}
                          {contract.tenantRating && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs text-gray-500">Reseña inquilino</span>
                              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                <span className="text-sm text-blue-900">{contract.tenantRating}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Inicio de contrato</p>
                            <p className="text-gray-900">{new Date(contract.startDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Fin de contrato</p>
                            <p className="text-gray-900">{new Date(contract.endDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Alquiler mensual</p>
                            <p className="text-gray-900">${contract.monthlyRent}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedContract(contract);
                            setDetailsOpen(true);
                          }}
                        >
                          Ver detalles completos
                        </Button>
                      </div>
                    </div>
                    {((contractPanel?.id===contract.id && contractPanel.section==='chat') || (contractPanel?.id===contract.id && contractPanel.section==='docs') || (contractPanel?.id===contract.id && contractPanel.section==='incidents') || (contractPanel?.id===contract.id && contractPanel.section==='payments') || (contractPanel?.id===contract.id && contractPanel.section==='reviews')) && <div className="px-6 pb-5 space-y-3">
                      {(contractPanel?.id===contract.id && contractPanel.section==='chat') && contract.proposalId && <ProposalChatInline proposalId={contract.proposalId} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='docs') && <ContractDocumentsPanel contractId={contract.id} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='payments')&&<RentalPaymentsPanel contractId={contract.id} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='reviews')&&['pending_review','completed'].includes(contract.status)&&<RentalReviewPanel contractId={contract.id}/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='incidents')&&<RentalIncidentsPanel contractId={contract.id} readOnly/>}
                    </div>}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="finished-contracts" className="space-y-4">
            {finishedContracts.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-gray-900 mb-2">No hay contratos finalizados</h2>
                <p className="text-gray-600">Los contratos de alquiler finalizados aparecerán aquí</p>
              </div>
            ) : (
              finishedContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                      <ImageWithFallback src={contract.propertyImage} alt={contract.property} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-gray-900 mb-2">{contract.property}</h3>
                          <p className="text-gray-600 text-sm mb-3">{contract.propertyAddress}</p>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                              <ImageWithFallback src={contract.tenant.avatar} alt={contract.tenant.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">{contract.tenant.name}</p>
                              <p className="text-xs text-gray-500">{contract.tenant.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Link to={`/contracts/${contract.id}`}><Button size="sm" variant="outline">Contrato y registro</Button></Link>
                          {contract.proposalId && <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'chat')}>Historial del chat</Button>}
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'docs')}>Documentos</Button>
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'incidents')}>Incidencias</Button>
                          <Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'payments')}>Historial de pagos</Button>
                          {['pending_review','completed'].includes(contract.status)&&<Button size="sm" variant="outline" onClick={()=>toggleContractPanel(contract.id,'reviews')}>Calificar inquilino</Button>}
                          {contract.ownerRating && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs text-gray-500">Tu reseña</span>
                              <div className="flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4 fill-purple-600 text-purple-600" />
                                <span className="text-sm text-purple-900">{contract.ownerRating}</span>
                              </div>
                            </div>
                          )}
                          {contract.tenantRating && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs text-gray-500">Reseña inquilino</span>
                              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                <span className="text-sm text-blue-900">{contract.tenantRating}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Inicio de contrato</p>
                            <p className="text-gray-900">{new Date(contract.startDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Fin de contrato</p>
                            <p className="text-gray-900">{new Date(contract.endDate).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <div>
                            <p className="text-gray-500 text-xs">Alquiler mensual</p>
                            <p className="text-gray-900">${contract.monthlyRent}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedContract(contract);
                            setDetailsOpen(true);
                          }}
                        >
                          Ver detalles completos
                        </Button>
                      </div>
                    </div>
                    {((contractPanel?.id===contract.id && contractPanel.section==='chat') || (contractPanel?.id===contract.id && contractPanel.section==='docs') || (contractPanel?.id===contract.id && contractPanel.section==='incidents') || (contractPanel?.id===contract.id && contractPanel.section==='payments') || (contractPanel?.id===contract.id && contractPanel.section==='reviews')) && <div className="px-6 pb-5 space-y-3">
                      {(contractPanel?.id===contract.id && contractPanel.section==='chat') && contract.proposalId && <ProposalChatInline proposalId={contract.proposalId} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='docs') && <ContractDocumentsPanel contractId={contract.id} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='payments')&&<RentalPaymentsPanel contractId={contract.id} readOnly/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='reviews')&&['pending_review','completed'].includes(contract.status)&&<RentalReviewPanel contractId={contract.id}/>}
                      {(contractPanel?.id===contract.id && contractPanel.section==='incidents')&&<RentalIncidentsPanel contractId={contract.id} readOnly/>}
                    </div>}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            {propertiesLoading && <p className="py-6 text-gray-600">Cargando tus propiedades...</p>}
            {propertiesError && <p role="alert" className="py-4 text-red-600">{propertiesError}</p>}
            {!propertiesLoading && !propertiesError && myProperties.length === 0 && (
              <div className="text-center py-10"><p className="mb-4">Todavía no publicaste propiedades.</p><Link to="/host/add-property"><Button>Publicar mi primera propiedad</Button></Link></div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <ImageWithFallback src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <Badge className={`absolute top-3 right-3 ${property.status === 'Alquilado' ? 'bg-green-600' : 'bg-blue-600'}`}>{property.status}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{property.location}</p>

                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Habitaciones</p>
                        <p className="text-gray-900">{property.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Baños</p>
                        <p className="text-gray-900">{property.bathrooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Alquiler</p>
                        <p className="text-gray-900">${property.monthlyRent}</p>
                      </div>
                    </div>

                    {property.currentTenant && (
                      <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-600">Inquilino actual</p>
                        <p className="text-sm text-gray-900">{property.currentTenant}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link to={`/property/${property.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Eye className="h-4 w-4 mr-2" />Ver</Button></Link>
                      <Link to={`/host/edit-property/${property.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Edit className="h-4 w-4 mr-2" />Editar</Button></Link>
                      <Button variant="outline" size="sm" onClick={() => void deleteProperty(property.id)} aria-label={`Eliminar ${property.title}`}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dejar reseña del inquilino</DialogTitle>
            <DialogDescription>Comparte tu experiencia con {selectedContract?.tenant.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Calificación general</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewRating(rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${rating <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-600">{reviewRating} de 5</span>
              </div>
            </div>

            <Separator />

            {/* Specific Questions */}
            <div className="space-y-4">
              <h3 className="text-gray-900 text-sm">Preguntas específicas</h3>

              <div className="space-y-2">
                <Label>¿Los pagos fueron puntuales?</Label>
                <RadioGroup value={timelyPayments} onValueChange={setTimelyPayments}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="payments-yes" />
                    <Label htmlFor="payments-yes" className="cursor-pointer">
                      Sí, siempre a tiempo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="payments-sometimes" />
                    <Label htmlFor="payments-sometimes" className="cursor-pointer">
                      A veces con retrasos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="payments-no" />
                    <Label htmlFor="payments-no" className="cursor-pointer">
                      Frecuentemente retrasados
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>¿En qué estado dejó la propiedad?</Label>
                <RadioGroup value={propertyCondition} onValueChange={setPropertyCondition}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="condition-excellent" />
                    <Label htmlFor="condition-excellent" className="cursor-pointer">
                      Excelente estado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="condition-good" />
                    <Label htmlFor="condition-good" className="cursor-pointer">
                      Buen estado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="condition-fair" />
                    <Label htmlFor="condition-fair" className="cursor-pointer">
                      Estado regular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="condition-poor" />
                    <Label htmlFor="condition-poor" className="cursor-pointer">
                      Mal estado
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>¿Tuvo mascotas?</Label>
                <RadioGroup value={hasPet} onValueChange={setHasPet}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pet-no" />
                    <Label htmlFor="pet-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pet-yes" />
                    <Label htmlFor="pet-yes" className="cursor-pointer">
                      Sí
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {hasPet === 'yes' && (
                <div className="space-y-2">
                  <Label>¿Cómo fue el comportamiento de la mascota?</Label>
                  <RadioGroup value={petBehavior} onValueChange={setPetBehavior}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="pet-excellent" />
                      <Label htmlFor="pet-excellent" className="cursor-pointer">
                        Excelente, sin daños
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="pet-good" />
                      <Label htmlFor="pet-good" className="cursor-pointer">
                        Bueno, daños menores
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="pet-fair" />
                      <Label htmlFor="pet-fair" className="cursor-pointer">
                        Regular, algunos daños
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="pet-poor" />
                      <Label htmlFor="pet-poor" className="cursor-pointer">
                        Mal, daños significativos
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            <Separator />

            {/* Comment */}
            <div className="space-y-2">
              <Label>Comentario (opcional)</Label>
              <Textarea
                placeholder="Comparte más detalles sobre tu experiencia con este inquilino..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setReviewOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmitTenantReview} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Enviar reseña
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contract Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del contrato finalizado</DialogTitle>
            <DialogDescription>
              {selectedContract?.property} - Contrato del {selectedContract?.startDate && new Date(selectedContract.startDate).toLocaleDateString('es-ES')} al {selectedContract?.endDate && new Date(selectedContract.endDate).toLocaleDateString('es-ES')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Property Summary */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                  <ImageWithFallback
                    src={selectedContract?.propertyImage}
                    alt={selectedContract?.property}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-gray-900 mb-1">{selectedContract?.property}</h3>
                  <p className="text-gray-600 text-sm mb-2">{selectedContract?.propertyAddress}</p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Inquilino:</span>
                      <span className="text-gray-900 ml-1">{selectedContract?.tenant.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <h3 className="text-gray-900">Reseñas</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Owner Review */}
                <Card className="p-4 bg-purple-50/50 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                        <Home className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">Tu reseña al inquilino</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-purple-500 text-purple-500" />
                      <span className="text-sm">{selectedContract?.ownerRating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {selectedContract?.ownerReviewComment}
                  </p>
                </Card>

                {/* Tenant Review */}
                <Card className="p-4 bg-blue-50/50 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">Reseña del inquilino</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                      <span className="text-sm">{selectedContract?.tenantRating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {selectedContract?.tenantReviewComment}
                  </p>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Chat History */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h3 className="text-gray-900">Historial de conversación</h3>
              </div>
              
              <Card className="p-4 max-h-64 overflow-y-auto">
                {selectedContract?.chatHistory && selectedContract.chatHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedContract.chatHistory.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.sender === 'owner' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.sender === 'owner'
                              ? 'bg-purple-600'
                              : 'bg-blue-600'
                          }`}
                        >
                          {msg.sender === 'owner' ? (
                            <Home className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`flex-1 max-w-[70%] ${
                            msg.sender === 'owner' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              msg.sender === 'owner'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-1">
                            {new Date(msg.timestamp).toLocaleString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay mensajes en el historial</p>
                )}
              </Card>
            </div>

            <Separator />

            {/* Documents */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-gray-900">Documentos del contrato</h3>
              </div>

              {selectedContract?.documents && selectedContract.documents.length > 0 ? (
                <div className="space-y-2">
                  {selectedContract.documents.map((doc: any) => (
                    <Card key={doc.id} className="p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{doc.name}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                              <Badge 
                                variant="secondary" 
                                className={doc.uploadedBy === 'Inquilino' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}
                              >
                                {doc.uploadedBy}
                              </Badge>
                              <span>•</span>
                              <span>{new Date(doc.uploadDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toast.success('Descargando documento...')}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8">
                  <p className="text-gray-500 text-center">No hay documentos disponibles</p>
                </Card>
              )}
            </div>

            {/* Close button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => {
                  setDetailsOpen(false);
                  setSelectedContract(null);
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
