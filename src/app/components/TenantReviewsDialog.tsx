import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, Sparkles } from 'lucide-react';
import { Separator } from './ui/separator';
import { Review } from '../types';

interface TenantReviewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  tenantAvatar: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  aiSummary: string;
}

export function TenantReviewsDialog({
  open,
  onOpenChange,
  tenantName,
  tenantAvatar,
  rating,
  reviewCount,
  reviews,
  aiSummary,
}: TenantReviewsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reseñas de {tenantName} como inquilino</DialogTitle>
          <DialogDescription>
            Evaluaciones de propietarios anteriores
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tenant Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={tenantAvatar} alt={tenantName} />
              <AvatarFallback>{tenantName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{tenantName}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-gray-900">{rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">·</span>
                <span className="text-gray-600">{reviewCount} reseña{reviewCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          {aiSummary && (
            <>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                      Resumen descriptivo
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {aiSummary}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      Este resumen es demostrativo; no se utilizó un servicio externo de inteligencia artificial
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Reviews */}
          <div className="space-y-4">
            <h4 className="text-gray-900">
              Todas las reseñas ({reviewCount})
            </h4>
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="text-gray-900">{review.author.name}</p>
                        <p className="text-xs text-gray-500">Propietario</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-900">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Distribution */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-gray-900 mb-3">Distribución de calificaciones</h4>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => Math.floor(r.rating) === stars).length;
              const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
              
              return (
                <div key={stars} className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 w-12">{stars} {stars === 1 ? 'estrella' : 'estrellas'}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Info */}
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p>
              💡 <span className="text-gray-900">Tip:</span> Las reseñas de inquilinos son evaluaciones de propietarios 
              anteriores que han alquilado a {tenantName}. Incluyen información sobre puntualidad en pagos, 
              cuidado de la propiedad, cumplimiento de normas y comportamiento general durante el contrato de alquiler.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
