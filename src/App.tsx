import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';
import { useAdmin } from './hooks/useAdmin';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import VotePage from './pages/VotePage/VotePage';
import AdminPage from './pages/AdminPage/AdminPage';
import './styles/global.scss';

function AdminGuard({ user }: { user: User }) {
  const { isAdmin, loading } = useAdmin(user.uid);
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <AdminPage user={user} />;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/vote/:roundId"
          element={user ? <VotePage user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin"
          element={user ? <AdminGuard user={user} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
