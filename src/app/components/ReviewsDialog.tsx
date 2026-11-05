import { Review } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface ReviewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviews: Review[];
  hostRating: number;
  hostName: string;
}

export function ReviewsDialog({
  open,
  onOpenChange,
  reviews,
  hostRating,
  hostName,
}: ReviewsDialogProps) {
  // Resumen local por reglas; no se invoca una IA externa.
  const generateAISummary = (reviews: Review[]): string => {
    if (!reviews || reviews.length === 0) {
      return 'No hay reseñas disponibles para generar un resumen.';
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const fiveStars = reviews.filter(r => r.rating === 5).length;
    const positivePercentage = Math.round((fiveStars / reviews.length) * 100);

    // Análisis de palabras clave en los comentarios sobre el propietario
    const allComments = reviews.map(r => r.comment.toLowerCase()).join(' ');
    const keywords = {
      comunicacion: /comunicaci[oó]n|comunicativo|respuesta|disponible|accesible/g,
      profesionalismo: /profesional|serio|formal|responsable|confiable/g,
      atencion: /atenci[oó]n|atento|servicial|amable|cordial/g,
      rapidez: /r[aá]pid[oa]|puntual|inmediato|pronto|eficiente/g,
      flexibilidad: /flexible|comprensivo|adaptable|razonable/g,
      transparencia: /transparente|honesto|claro|sincero|justo/g,
      mantenimiento: /mantenimiento|reparaci[oó]n|arreglo|soluci[oó]n/g,
    };

    const mentions: string[] = [];
    if ((allComments.match(keywords.comunicacion) || []).length >= 2) mentions.push('excelente comunicación');
    if ((allComments.match(keywords.profesionalismo) || []).length >= 2) mentions.push('gran profesionalismo');
    if ((allComments.match(keywords.atencion) || []).length >= 2) mentions.push('atención excepcional');
    if ((allComments.match(keywords.rapidez) || []).length >= 2) mentions.push('respuestas rápidas');
    if ((allComments.match(keywords.flexibilidad) || []).length >= 2) mentions.push('flexibilidad ante imprevistos');
    if ((allComments.match(keywords.transparencia) || []).length >= 2) mentions.push('transparencia en acuerdos');
    if ((allComments.match(keywords.mantenimiento) || []).length >= 2) mentions.push('rápida resolución de problemas');

    let summary = `${hostName} tiene una valoración promedio de ${avgRating.toFixed(1)}/5.0 estrellas como propietario, con ${positivePercentage}% de reseñas de 5 estrellas. `;
    
    if (mentions.length > 0) {
      summary += `Los inquilinos destacan especialmente: ${mentions.join(', ')}. `;
    }

    if (avgRating >= 4.8) {
      summary += 'Los inquilinos elogian consistentemente su comportamiento como propietario y lo recomiendan altamente para contratos de alquiler.';
    } else if (avgRating >= 4.5) {
      summary += 'La mayoría de los inquilinos han tenido experiencias muy positivas y recomiendan alquilar con este propietario.';
    } else {
      summary += 'Los inquilinos generalmente reportan experiencias positivas con este propietario.';
    }

    return summary;
  };

  const aiSummary = generateAISummary(reviews);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{hostRating} · {reviews.length} reseñas del propietario</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Reseñas de inquilinos sobre {hostName} como propietario
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Resumen estadístico */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-blue-900 mb-2">Resumen estadístico</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">{aiSummary}</p>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Lista de reseñas */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.author.avatar} />
                      <AvatarFallback>
                        {review.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-gray-900">{review.author.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{formatDate(review.date)}</p>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                  {review.id !== reviews[reviews.length - 1].id && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
