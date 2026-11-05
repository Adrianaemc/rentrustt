import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Check, Lock, MessageSquare, FileText, Star, Shield, CreditCard, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface UnlockPremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPayment: () => void;
  propertyTitle: string;
  propertyPrice: number;
  userType: 'owner' | 'tenant';
}

export function UnlockPremiumDialog({
  open,
  onOpenChange,
  onConfirmPayment,
  propertyTitle,
  propertyPrice,
  userType,
}: UnlockPremiumDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Calcular comisión (4% del precio mensual de la propiedad)
  const commissionRate = 0.04;
  const commissionAmount = Math.round(propertyPrice * commissionRate);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simular proceso de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirmPayment();
  };

  const premiumFeatures = [
    {
      icon: MessageSquare,
      title: 'Chat interno seguro',
      description: 'Comunícate directamente con mensajería encriptada',
    },
    {
      icon: FileText,
      title: 'Gestión de documentación',
      description: 'Sube y comparte contratos, recibos y documentos de forma segura',
    },
    {
      icon: Shield,
      title: 'Verificación de identidad',
      description: 'Verificación completa de ambas partes para mayor seguridad',
    },
    {
      icon: Star,
      title: 'Sistema de reseñas',
      description: 'Deja y recibe reseñas al finalizar el contrato',
    },
    {
      icon: CreditCard,
      title: 'Gestión de pagos',
      description: 'Historial de pagos y recordatorios automáticos',
    },
    {
      icon: Calendar,
      title: 'Calendario compartido',
      description: 'Coordina visitas, mantenimientos y vencimientos importantes',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">Premium</Badge>
          </div>
          <DialogTitle>Desbloquea funcionalidades premium</DialogTitle>
          <DialogDescription>
            Para continuar con el proceso de alquiler y acceder a todas las herramientas de RenTrust
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm text-gray-600 mb-1">Propiedad</h4>
            <p className="text-gray-900">{propertyTitle}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Alquiler mensual:</span>
              <span className="text-gray-900">${propertyPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>

          {/* Commission Info */}
          <div className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-gray-900 mb-1">Comisión única de servicio</h4>
                <p className="text-sm text-gray-600">
                  {commissionRate * 100}% del primer mes de alquiler
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Pago único</p>
                <p className="text-2xl text-purple-600">${commissionAmount.toLocaleString('es-AR')}</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <p>
                {userType === 'owner' ? 
                  'El inquilino también paga su comisión. Ambas partes acceden a las funcionalidades premium.' :
                  'El propietario también paga su comisión. Ambas partes acceden a las funcionalidades premium.'
                }
              </p>
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <h4 className="text-gray-900 mb-4">¿Qué incluye Premium?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 mb-1">{feature.title}</p>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How it works */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-gray-900 mb-3">¿Cómo funciona?</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  1
                </div>
                <div>
                  <p className="text-sm text-gray-900">Realiza el pago único de ${commissionAmount.toLocaleString('es-AR')}</p>
                  <p className="text-xs text-gray-600">Solo pagas una vez por todo el proceso</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  2
                </div>
                <div>
                  <p className="text-sm text-gray-900">Accede a todas las funcionalidades premium</p>
                  <p className="text-xs text-gray-600">Chat, documentación, contratos y más</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  3
                </div>
                <div>
                  <p className="text-sm text-gray-900">Completa el proceso de alquiler de forma segura</p>
                  <p className="text-xs text-gray-600">Todo gestionado dentro de RenTrust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm">
            <Shield className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900 mb-1">Pago seguro y protegido</p>
              <p className="text-gray-600">
                Utilizamos encriptación de nivel bancario. Tus datos están protegidos y nunca compartimos tu información financiera.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
            <p className="mb-2">
              <span className="text-gray-900">Nota importante:</span> Este pago es una comisión de servicio única por el uso de la plataforma RenTrust durante todo el proceso de alquiler. No incluye depósitos, garantías ni pagos de alquiler, los cuales se gestionan según lo acordado en el contrato.
            </p>
            <p>
              Una vez realizado el pago, ambas partes (inquilino y propietario) tendrán acceso completo a todas las funcionalidades premium durante todo el período del contrato de alquiler (3 años).
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pagar ${commissionAmount.toLocaleString('es-AR')} y desbloquear
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
