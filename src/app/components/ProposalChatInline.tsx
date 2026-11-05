import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Send, Search, ChevronDown, ChevronUp } from 'lucide-react';

type Message = {id:string; sender_id:string; body:string; created_at:string};
export function ProposalChatInline({proposalId, readOnly=false}:{proposalId:string;readOnly?:boolean}) {
 const [messages,setMessages]=useState<Message[]>([]); const [userId,setUserId]=useState('');
 const [draft,setDraft]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 const [history,setHistory]=useState(false); const [query,setQuery]=useState('');
 const refresh=async()=>{
   const [{data:{user}},result]=await Promise.all([supabase.auth.getUser(),supabase.from('proposal_messages').select('id,sender_id,body,created_at').eq('proposal_id',proposalId).order('created_at',{ascending:true})]);
   setUserId(user?.id||''); if(result.error)setError(result.error.message); else {setError('');setMessages(result.data||[])};
 };
 useEffect(()=>{setMessages([]);setHistory(false);setQuery('');void refresh();if(readOnly)return;const timer=window.setInterval(()=>void refresh(),8000);return()=>window.clearInterval(timer)},[proposalId,readOnly]);
 const send=async()=>{if(!draft.trim()||!userId||readOnly)return;setBusy(true);const {error}=await supabase.from('proposal_messages').insert({proposal_id:proposalId,sender_id:userId,body:draft.trim()});if(error)toast.error(error.message);else{setDraft('');await refresh()}setBusy(false)};
 const visible=messages.filter(m=>m.body.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 const shown=history||query?visible:visible.slice(-5);
 return <section className="rounded-xl border bg-gray-50 p-4 space-y-3 min-w-0">
   <div className="flex flex-wrap items-center justify-between gap-2"><div><h4 className="text-sm font-semibold">{readOnly?'Historial de conversación':'Conversación del alquiler'}</h4><p className="text-xs text-gray-500">{messages.length} mensajes guardados</p></div>
   {messages.length>5&&<Button type="button" size="sm" variant="outline" onClick={()=>setHistory(v=>!v)}>{history?<ChevronUp className="h-4 w-4 mr-1"/>:<ChevronDown className="h-4 w-4 mr-1"/>}{history?'Ver recientes':'Ver historial completo'}</Button>}</div>
   {(history||messages.length>5)&&<div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/><Input aria-label="Buscar en conversación" placeholder="Buscar mensajes en el historial" className="pl-9" value={query} onChange={e=>setQuery(e.target.value)}/></div>}
   {error&&<p role="alert" className="text-sm text-red-600">{error}</p>}
   <div className={`${history?'max-h-[28rem]':'max-h-72'} overflow-y-auto overscroll-contain space-y-2 rounded-lg border bg-white/60 p-2`}>
   {shown.length===0&&<p className="text-sm text-gray-500">{query?'No hay mensajes que coincidan.':'Todavía no hay mensajes.'}</p>}
   {shown.map(m=><div key={m.id} className={`rounded-lg p-3 text-sm max-w-[92%] ${m.sender_id===userId?'bg-blue-100 ml-auto':'bg-white border mr-auto'}`}><p className="text-xs text-gray-500 mb-1">{m.sender_id===userId?'Vos':'La otra parte'} · {new Date(m.created_at).toLocaleString('es-AR')}</p><p className="whitespace-pre-wrap break-words">{m.body}</p></div>)}
   </div>
   {!history&&!query&&messages.length>5&&<p className="text-xs text-gray-500">Se muestran los últimos 5 mensajes. El historial anterior se conserva.</p>}
   {!readOnly&&<div className="flex gap-2"><Input aria-label="Mensaje" placeholder="Escribí tu mensaje" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();void send()}}} maxLength={3000}/><Button disabled={busy||!draft.trim()} onClick={()=>void send()} aria-label="Enviar mensaje"><Send className="h-4 w-4"/></Button></div>}
 </section>;
}
