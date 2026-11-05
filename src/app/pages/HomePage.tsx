import { Footer } from '../components/Footer';
import { LoginDialog } from '../components/LoginDialog';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle2, FileSignature, HeartHandshake, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: ShieldCheck, title: 'Perfiles confiables', description: 'Conocé la reputación y trayectoria de quienes participan en cada alquiler.' },
  { icon: HeartHandshake, title: 'Acuerdos claros', description: 'Enviá propuestas, conversá y seguí cada etapa desde un solo lugar.' },
  { icon: FileSignature, title: 'Todo organizado', description: 'Contratos, pagos y documentación siempre al alcance.' },
];

export function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const destination = user?.type === 'owner' ? '/host' : '/listings';
  const action = (label: string, className: string) => isLoggedIn
    ? <Link to={destination}><Button size="lg" className={className}>{label}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
    : <LoginDialog><Button size="lg" className={className}>{label}<ArrowRight className="ml-2 h-4 w-4" /></Button></LoginDialog>;

  return (
    <div className="min-h-screen bg-[#faf9f7] text-slate-900">
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-slate-950 sm:min-h-[690px]">
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920"
          alt="Casa contemporánea con jardín"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-sky-300" /> Una nueva forma de alquilar
            </div>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Tu próximo alquiler empieza con <span className="text-sky-300">confianza.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              RenTrust conecta propietarios e inquilinos para que encontrar, acordar y gestionar un alquiler sea más simple, seguro y transparente.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {action(isLoggedIn ? 'Ir a mi espacio' : 'Iniciar sesión', 'h-12 rounded-xl bg-white px-7 text-slate-950 shadow-lg hover:bg-blue-50')}
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/90">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300" /> Perfiles y reseñas</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300" /> Propuestas en línea</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300" /> Contratos organizados</span>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Todo en un mismo lugar</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Alquilar puede ser mucho más simple.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">Desde el primer contacto hasta la gestión del contrato, cada paso tiene su espacio.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="group rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-7 w-7" /></div>
              <p className="mb-3 text-xs font-semibold tracking-widest text-slate-400">0{index + 1}</p>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
          <div className="border-l-4 border-blue-700 pl-6">
            <div className="mb-4 flex items-center gap-3 text-blue-700"><KeyRound className="h-6 w-6" /><span className="text-sm font-semibold uppercase tracking-wider">Propietarios</span></div>
            <h3 className="text-2xl font-semibold">Tus propiedades, bajo control.</h3>
            <p className="mt-3 leading-relaxed text-slate-600">Publicá, recibí propuestas, conocé a tus interesados y administrá tus alquileres de forma ordenada.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="mb-4 flex items-center gap-3 text-blue-700"><HeartHandshake className="h-6 w-6" /><span className="text-sm font-semibold uppercase tracking-wider">Inquilinos</span></div>
            <h3 className="text-2xl font-semibold">Encontrá un lugar para vos.</h3>
            <p className="mt-3 leading-relaxed text-slate-600">Explorá anuncios, guardá favoritos, enviá propuestas y seguí tus contratos sin complicaciones.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
