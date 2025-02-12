import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const AdminRoute = ({ children }) => {
  const { isLoggedIn, token, isAdmin } = useAuth();
  const location = useLocation();

  if ((!isLoggedIn || !token) && !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};