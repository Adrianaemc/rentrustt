import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { validCuit } from '../lib/cuit';

interface LoginDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LoginDialog({ children, open: controlledOpen, onOpenChange }: LoginDialogProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('tenant');
  const [isRegister, setIsRegister] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled open state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cuit, setCuit] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (isRegister && password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (isRegister && password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (isRegister && !validCuit(cuit)) { toast.error('Ingresá un CUIT/CUIL válido de 11 dígitos.'); return; }
    setSubmitting(true);
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { name: name.trim(), type: activeTab, cuit: cuit.replace(/\D/g,'') } }
        });
        if (error) throw error;
        if (!data.session) {
          toast.success('Cuenta creada. Revisá tu correo para confirmar la cuenta antes de ingresar.');
          setIsRegister(false);
          setPassword(''); setConfirmPassword('');
          return;
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        const realType = data.user.user_metadata?.type === 'owner' ? 'owner' : 'tenant';
        if (realType !== activeTab) toast.message(`Tu cuenta está registrada como ${realType === 'owner' ? 'propietario' : 'inquilino'}.`);
      }
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const role = currentUser?.user_metadata?.type === 'owner' ? 'owner' : 'tenant';
      toast.success('¡Bienvenido a RenTrust!');
      setEmail(''); setPassword(''); setName(''); setCuit(''); setConfirmPassword('');
      setIsOpen(false);
      navigate(role === 'owner' ? '/profile/owner' : '/profile/tenant');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo completar la operación');
    } finally { setSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</DialogTitle>
          <DialogDescription>
            {isRegister 
              ? 'Completa los datos para crear tu cuenta'
              : 'Ingresa tus credenciales para acceder a tu cuenta'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tenant">Inquilino</TabsTrigger>
            <TabsTrigger value="owner">Propietario</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tenant" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name-tenant">Nombre completo</Label>
                  <Input
                    id="name-tenant"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {isRegister && <div className="space-y-2"><Label htmlFor="cuit-tenant">CUIT / CUIL</Label><Input id="cuit-tenant" placeholder="XX-XXXXXXXX-X" value={cuit} onChange={e=>setCuit(e.target.value)} required inputMode="numeric"/></div>}
              <div className="space-y-2">
                <Label htmlFor="email-tenant">Correo electrónico</Label>
                <Input
                  id="email-tenant"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-tenant">Contraseña</Label>
                <Input
                  id="password-tenant"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-tenant">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password-tenant"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700">
                {isRegister ? 'Crear cuenta como Inquilino' : 'Ingresar como Inquilino'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="owner" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name-owner">Nombre completo</Label>
                  <Input
                    id="name-owner"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {isRegister && <div className="space-y-2"><Label htmlFor="cuit-owner">CUIT / CUIL</Label><Input id="cuit-owner" placeholder="XX-XXXXXXXX-X" value={cuit} onChange={e=>setCuit(e.target.value)} required inputMode="numeric"/></div>}
              <div className="space-y-2">
                <Label htmlFor="email-owner">Correo electrónico</Label>
                <Input
                  id="email-owner"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-owner">Contraseña</Label>
                <Input
                  id="password-owner"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-owner">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password-owner"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700">
                {isRegister ? 'Crear cuenta como Propietario' : 'Ingresar como Propietario'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              {isRegister ? 'o' : 'o'}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsRegister(!isRegister);
              setEmail('');
              setPassword('');
              setName('');
              setConfirmPassword('');
            }}
            className="text-blue-600"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Créala aquí'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
