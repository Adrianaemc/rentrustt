import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface AppUser {
  name: string;
  email: string;
  avatar: string;
  type: 'tenant' | 'owner';
}
interface AuthContextType {
  user: AppUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (userData: AppUser, initialFavorites?: string[]) => void;
  logout: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const mapUser = (u: SupabaseUser | null): AppUser | null => {
  if (!u) return null;
  const m = u.user_metadata ?? {};
  return {
    name: m.name || u.email?.split('@')[0] || 'Usuario',
    email: u.email || '',
    avatar: m.avatar || '',
    type: m.type === 'owner' ? 'owner' : 'tenant',
  };
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authId, setAuthId] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) { setUser(mapUser(data.user)); setAuthId(data.user?.id ?? null); setLoading(false); }
    }).catch(() => { if (mounted) setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null));
      setAuthId(session?.user?.id ?? null);
      setLoading(false);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    let active = true;
    if (!authId) { setFavorites([]); return; }
    setFavorites([]);
    supabase.from('favorites').select('property_id').eq('user_id', authId)
      .then(({ data, error }) => {
        if (active && !error) setFavorites((data || []).map(row => row.property_id));
        if (error) console.error('Error cargando favoritos:', error.message);
      });
    return () => { active = false; };
  }, [authId]);
  // Mantiene compatibilidad con los componentes existentes; no autentica por sí solo.
  const login = (_userData: AppUser, _initialFavorites?: string[]) => {};
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setFavorites([]);
  };
  const toggleFavorite = (propertyId: string) => {
    if (!authId) return;
    const wasFavorite = favorites.includes(propertyId);
    setFavorites(prev => wasFavorite ? prev.filter(id => id !== propertyId) : [...prev, propertyId]);
    const action = wasFavorite
      ? supabase.from('favorites').delete().eq('user_id', authId).eq('property_id', propertyId)
      : supabase.from('favorites').insert({ user_id: authId, property_id: propertyId });
    action.then(({ error }) => {
      if (error) {
        console.error('No se pudo guardar favorito:', error.message);
        setFavorites(prev => wasFavorite ? [...new Set([...prev, propertyId])] : prev.filter(id => id !== propertyId));
      }
    });
  };
  const isFavorite = (propertyId: string) => favorites.includes(propertyId);
  return <AuthContext.Provider value={{user, isLoggedIn: !!user, loading, login, logout, favorites, toggleFavorite, isFavorite}}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
