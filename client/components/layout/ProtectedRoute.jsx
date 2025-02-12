import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, token } = useAuth();
  const location = useLocation();

  if (!isLoggedIn || !token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};