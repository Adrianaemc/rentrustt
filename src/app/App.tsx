import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { BookingsPage } from './pages/BookingsPage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { AddPropertyPage } from './pages/AddPropertyPage';
import { MyPropertiesPage } from './pages/MyPropertiesPage';
import { ProposalsPage } from './pages/ProposalsPage';
import { ContractFormalizationPage } from './pages/ContractFormalizationPage';
import { ProfilePage } from './pages/ProfilePage';
import { TenantProfilePage } from './pages/TenantProfilePage';
import { OwnerProfilePage } from './pages/OwnerProfilePage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/contracts/:id" element={<ContractFormalizationPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/host" element={<HostDashboardPage />} />
            <Route path="/host-dashboard" element={<HostDashboardPage />} />
            <Route path="/host/my-properties" element={<Navigate to="/host" replace />} />
            <Route path="/host/add-property" element={<AddPropertyPage />} />
            <Route path="/host/edit-property/:id" element={<AddPropertyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/tenant" element={<TenantProfilePage />} />
            <Route path="/profile/owner" element={<OwnerProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}
