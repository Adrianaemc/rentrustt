import { useState } from 'react';
import { mockUser } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { User, Mail, Phone, Shield, Bell, CreditCard, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast('¡Perfil actualizado exitosamente!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-8">Configuración del perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 h-fit">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{user.email}</p>
              {user.isHost && (
                <Badge className="mb-4">Propietario verificado</Badge>
              )}
              <Button variant="outline" className="w-full">
                <Edit2 className="h-4 w-4 mr-2" />
                Cambiar foto
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-sm">Email verificado</span>
                </div>
                <Badge variant="secondary">✓</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-sm">Teléfono verificado</span>
                </div>
                <Badge variant="secondary">✓</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-sm">Identidad verificada</span>
                </div>
                <Badge variant="secondary">✓</Badge>
              </div>
            </div>
          </Card>

          {/* Settings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6"><TabsTrigger value="personal">Información personal</TabsTrigger></TabsList>

              <TabsContent value="personal">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-900">Información personal</h3>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={user.name.split(' ')[0]}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={user.name.split(' ')[1]}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Número de teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={user.phone}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-6">Preferencias de notificaciones</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Notificaciones por email</p>
                        <p className="text-sm text-gray-600">
                          Recibir actualizaciones de reservas por email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Notificaciones por SMS</p>
                        <p className="text-sm text-gray-600">
                          Recibir mensajes de texto para actualizaciones importantes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Emails de marketing</p>
                        <p className="text-sm text-gray-600">
                          Recibir ofertas promocionales y noticias
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Recordatorios de reservas</p>
                        <p className="text-sm text-gray-600">
                          Recibir recordatorios sobre próximas reservas
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Mensajes de anfitriones</p>
                        <p className="text-sm text-gray-600">
                          Recibir mensajes de los anfitriones de propiedades
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="p-6 mb-4">
                  <h3 className="text-gray-900 mb-6">Contraseña</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Actualizar contraseña</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-gray-900 mb-6">Autenticación de dos factores</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-900">Activar 2FA</p>
                      <p className="text-sm text-gray-600">
                        Agregar una capa adicional de seguridad a tu cuenta
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="text-gray-900 mb-4">Dispositivos de confianza</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm">MacBook Pro</p>
                          <p className="text-xs text-gray-600">Última actividad: Hoy</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Eliminar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm">iPhone 14</p>
                          <p className="text-xs text-gray-600">Última actividad: Hace 2 días</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
