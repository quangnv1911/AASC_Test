import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import ContactDetailPage from './pages/ContactDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import ContactForm from './components/ContactForm';
function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/contacts" replace /> : <LoginPage />
      } />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/contacts" replace /> : <Navigate to="/login" replace />
      } />
      
      {/* Protected routes */}
      <Route path="/contacts" element={
        <ProtectedRoute>
          <ContactsPage />
        </ProtectedRoute>
      } />

       <Route path="/contacts/new" element={
        <ProtectedRoute>
          <ContactForm />
        </ProtectedRoute>
      } />
      <Route path="/contacts/:id" element={
        <ProtectedRoute>
          <ContactDetailPage />
        </ProtectedRoute>
      } />
      
      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="container">
      <h1>AASC Test</h1>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
