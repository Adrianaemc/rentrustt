import { useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { validCuit } from '../lib/cuit';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar,AvatarImage,AvatarFallback } from './ui/avatar';
import { BadgeCheck, Camera, Mail, UserRound, ShieldCheck, Save, LogOut, ArrowLeft, Fingerprint } from 'lucide-react';
export function RealProfileForm({role}:{role:'owner'|'tenant'}){
 const {user,loading,logout}=useAuth();const navigate=useNavigate();
 const [busy,setBusy]=useState(false);const [avatar,setAvatar]=useState('');const [verified,setVerified]=useState(false);
 const [form,setForm]=useState({name:'',phone:'',bio:'',occupation:'',cuit:''});
 useEffect(()=>{let active=true;supabase.auth.getUser().then(({data})=>{
  if(!active||!data.user)return;setVerified(Boolean(data.user.email_confirmed_at));const m=data.user.user_metadata||{};const profile=m.profile||{};
  setForm({name:String(profile.name||m.name||''),phone:String(profile.phone||''),bio:String(profile.bio||''),occupation:String(profile.occupation||''),cuit:String(profile.cuit||m.cuit||'')});setAvatar(String(m.avatar||''));
 });return()=>{active=false}},[user?.email]);
 if(loading)return <main className="p-8">Cargando perfil…</main>;
 if(!user)return <main className="p-8">Iniciá sesión para editar tu perfil.</main>;
 if(user.type!==role)return <Navigate to={user.type==='owner'?'/profile/owner':'/profile/tenant'} replace />;
 const save=async()=>{if(!form.name.trim()||!validCuit(form.cuit)){toast.error('Completá tu nombre y un CUIT/CUIL válido.');return;}
  setBusy(true);const {error}=await supabase.auth.updateUser({data:{name:form.name,cuit:form.cuit.replace(/\D/g,''),avatar,profile:{...form,cuit:form.cuit.replace(/\D/g,'')}}});setBusy(false);
  if(error)toast.error(error.message);else toast.success('Perfil actualizado');};
 const onPhoto=(file?:File)=>{if(!file)return;if(!file.type.startsWith('image/')||file.size>2*1024*1024){toast.error('Elegí una imagen JPG o PNG de hasta 2 MB.');return;}
  const reader=new FileReader();reader.onload=()=>setAvatar(String(reader.result||''));reader.readAsDataURL(file);};
 const initials=form.name.trim().split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase()||'RT';
 return <main className="min-h-screen bg-[#f6f8fc] pb-16">
  <div className="relative overflow-hidden bg-gradient-to-br from-[#0b2447] via-[#123b6a] to-[#1c5685]">
   <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/10" />
   <div className="absolute right-24 top-20 h-48 w-48 rounded-full border border-white/10" />
   <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-10 sm:px-8 sm:pb-32 sm:pt-14">
    <div className="mb-7 flex items-center gap-2 text-sm text-blue-100"><UserRound className="h-4 w-4" /> Mi cuenta <span className="text-white/50">/</span> Perfil</div>
    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mi perfil</h1>
    <p className="mt-3 max-w-xl text-blue-100">Administrá tu información personal y mantené tus datos actualizados.</p>
   </div>
  </div>
  <div className="relative mx-auto -mt-20 grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[330px_minmax(0,1fr)]">
   <aside className="self-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
    <div className="h-24 bg-gradient-to-r from-[#dcebf8] via-[#eaf3fc] to-[#f5f9ff]" />
    <div className="px-7 pb-8">
     <div className="relative -mt-12 mb-5 w-fit">
      <Avatar className="h-24 w-24 border-4 border-white shadow-lg"><AvatarImage src={avatar}/><AvatarFallback className="bg-[#174b80] text-2xl font-semibold text-white">{initials}</AvatarFallback></Avatar>
      <label htmlFor="profile-photo" className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#174b80] text-white shadow-md transition hover:bg-[#10365f]" title="Cambiar fotografía"><Camera className="h-4 w-4" /></label>
      <input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={e=>onPhoto(e.target.files?.[0])}/>
     </div>
     <h2 className="break-words text-xl font-semibold text-slate-900">{form.name.trim()||'Tu nombre'}</h2>
     <p className="mt-1 break-all text-sm text-slate-500">{user.email}</p>
     <div className="mt-4">{verified?<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"><BadgeCheck className="h-4 w-4" /> Cuenta verificada</span>:<span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"><ShieldCheck className="h-4 w-4" /> Verificación pendiente</span>}</div>
     <div className="mt-6 border-t border-slate-100 pt-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Datos de la cuenta</p>
      <div className="space-y-4 text-sm">
       <div className="flex items-start gap-3"><div className="rounded-lg bg-blue-50 p-2 text-[#174b80]"><UserRound className="h-4 w-4" /></div><div><p className="text-xs text-slate-500">Tipo de cuenta</p><p className="font-medium text-slate-800">{role==='owner'?'Propietario':'Inquilino'}</p></div></div>
       <div className="flex items-start gap-3"><div className="rounded-lg bg-blue-50 p-2 text-[#174b80]"><Mail className="h-4 w-4" /></div><div className="min-w-0"><p className="text-xs text-slate-500">Correo electrónico</p><p className="break-all font-medium text-slate-800">{user.email}</p></div></div>
       <div className="flex items-start gap-3"><div className="rounded-lg bg-blue-50 p-2 text-[#174b80]"><Fingerprint className="h-4 w-4" /></div><div><p className="text-xs text-slate-500">CUIT / CUIL</p><p className="font-medium text-slate-800">{form.cuit||'Sin completar'}</p></div></div>
      </div>
     </div>
     <p className="mt-6 text-xs leading-relaxed text-slate-400">Podés cambiar tu foto desde el ícono de cámara. JPG, PNG o WebP, hasta 2 MB.</p>
    </div>
   </aside>
   <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
    <div className="border-b border-slate-100 px-6 py-7 sm:px-9">
     <div className="flex items-center gap-3"><div className="rounded-xl bg-blue-50 p-3 text-[#174b80]"><UserRound className="h-6 w-6" /></div><div><h2 className="text-xl font-semibold text-slate-900">Información personal</h2><p className="mt-1 text-sm text-slate-500">Completá los datos que se mostrarán en tu perfil.</p></div></div>
    </div>
    <div className="space-y-6 px-6 py-8 sm:px-9">
     <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2"><Label htmlFor="name" className="font-medium text-slate-700">Nombre completo <span className="text-blue-700">*</span></Label><Input id="name" className="h-11 rounded-xl" value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} placeholder="Tu nombre y apellido" /></div>
      <div className="space-y-2"><Label htmlFor="cuit" className="font-medium text-slate-700">CUIT / CUIL <span className="text-blue-700">*</span></Label><Input id="cuit" className="h-11 rounded-xl" value={form.cuit} onChange={e=>setForm(v=>({...v,cuit:e.target.value}))} placeholder="XX-XXXXXXXX-X" /></div>
      <div className="space-y-2"><Label htmlFor="phone" className="font-medium text-slate-700">Teléfono</Label><Input id="phone" className="h-11 rounded-xl" value={form.phone} onChange={e=>setForm(v=>({...v,phone:e.target.value}))} placeholder="Tu número de contacto" /></div>
      <div className="space-y-2"><Label htmlFor="occupation" className="font-medium text-slate-700">Ocupación</Label><Input id="occupation" className="h-11 rounded-xl" value={form.occupation} onChange={e=>setForm(v=>({...v,occupation:e.target.value}))} placeholder="¿A qué te dedicás?" /></div>
     </div>
     <div className="space-y-2"><Label htmlFor="bio" className="font-medium text-slate-700">Sobre mí</Label><Textarea id="bio" className="min-h-28 resize-y rounded-xl" value={form.bio} onChange={e=>setForm(v=>({...v,bio:e.target.value}))} placeholder="Contá un poco sobre vos..." /><p className="text-xs text-slate-400">Una breve presentación ayuda a generar confianza.</p></div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-9">
     <Button variant="outline" className="rounded-xl" onClick={()=>navigate(role==='owner'?'/host':'/bookings')}><ArrowLeft className="mr-2 h-4 w-4" /> Mis propiedades</Button>
     <div className="flex flex-wrap gap-3"><Button variant="outline" className="rounded-xl" onClick={async()=>{await logout();navigate('/')}}><LogOut className="mr-2 h-4 w-4" /> Cerrar sesión</Button><Button disabled={busy} className="rounded-xl bg-[#174b80] px-6 hover:bg-[#10365f]" onClick={()=>void save()}><Save className="mr-2 h-4 w-4" /> {busy?'Guardando…':'Guardar cambios'}</Button></div>
    </div>
   </section>
  </div>
 </main>;
}
