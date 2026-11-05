import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Calendar, Menu, LogIn, User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LoginDialog } from './LoginDialog';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function Navbar() {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
  };

  const getNavigation = () => {
    if (!isLoggedIn || !user) return [];
    if (user.type === 'owner') return [{ name: 'Mis propiedades', path: '/host', icon: Calendar }];
    return [
      { name: 'Anuncios', path: '/listings', icon: Home },
      { name: 'Favoritos', path: '/favorites', icon: Heart },
      { name: 'Mis propiedades', path: '/bookings', icon: Calendar },
    ];
  };

  const navigation = getNavigation();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl text-blue-600">RenTrust</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* User Avatar - Logged In */}
            {isLoggedIn && user ? (
              <Link 
                to={user.type === 'tenant' ? '/profile/tenant' : '/profile/owner'}
                className="transition-opacity hover:opacity-80"
              >
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-blue-600 ring-offset-2">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              /* Login Dialog - Not Logged In */
              <LoginDialog>
                <button className="flex items-center space-x-1 transition-colors text-gray-700 hover:text-blue-600 cursor-pointer">
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar sesión</span>
                </button>
              </LoginDialog>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {/* Mobile User Menu */}
                <div className="pt-4 border-t space-y-2">
                  {isLoggedIn && user ? (
                    <Link
                      to={user.type === 'tenant' ? '/profile/tenant' : '/profile/owner'}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-600">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">Ver mi perfil</p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <LoginDialog>
                      <button className="w-full flex items-center space-x-3 p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 cursor-pointer">
                        <LogIn className="h-5 w-5" />
                        <span>Iniciar sesión</span>
                      </button>
                    </LoginDialog>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
