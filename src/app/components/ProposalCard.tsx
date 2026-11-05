import type { ReactNode } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageSquare } from 'lucide-react';

export type ProposalCardData = {
  id: string; status: string; message: string; created_at: string;
  properties?: { title?: string; address?: string; city?: string; images?: string[] } | null;
};
const labels: Record<string,string> = {pending:'Pendiente',accepted:'Aceptada',rejected:'Rechazada',cancelled:'Cancelada'};
export function ProposalCard({ proposal, participantLabel, actions, expanded, onToggle, children }: {
  proposal: ProposalCardData; participantLabel: string; actions?: ReactNode;
  expanded: boolean; onToggle: () => void; children?: ReactNode;
}) {
  const p=proposal;
  const date=p.created_at ? new Date(p.created_at).toLocaleString('es-AR',{dateStyle:'medium',timeStyle:'short'}) : '';
  const badgeColor=p.status==='pending'?'bg-amber-500 text-white':p.status==='accepted'?'bg-green-600 text-white':p.status==='rejected'?'bg-red-500 text-white':'bg-gray-500 text-white';
  return <article className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 hover:border-gray-300 transition-colors">
    <div className="flex gap-3 items-start">
      <div className="h-[76px] w-[76px] sm:h-[84px] sm:w-[84px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {p.properties?.images?.[0] ? <ImageWithFallback src={p.properties.images[0]} alt={p.properties?.title||'Propiedad'} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-xs text-gray-400">Sin foto</div>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0"><h3 className="text-sm font-semibold text-gray-900">{p.properties?.title||'Propiedad'}</h3><p className="text-xs text-gray-500 mt-0.5">{[p.properties?.address,p.properties?.city].filter(Boolean).join(', ')}</p></div>
          <Badge className={`shrink-0 text-[11px] ${badgeColor}`}>{labels[p.status]||p.status}</Badge>
        </div>
        <p className="mt-2 text-xs text-gray-700"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-semibold mr-1 align-middle">{participantLabel.charAt(0)}</span>{participantLabel} <span className="text-gray-400 ml-1">· {date}</span></p>
        <p className="mt-2 text-sm text-gray-700 line-clamp-2 whitespace-pre-wrap break-words">{p.message}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={onToggle}><MessageSquare className="h-4 w-4 mr-1"/>{expanded?'Ocultar detalles':'Ver detalles'}</Button>
          {actions}
        </div>
      </div>
    </div>
    {expanded && <div className="mt-4 border-t pt-4 space-y-3"><p className="text-sm whitespace-pre-wrap break-words">{p.message}</p>{children}</div>}
  </article>;
}
