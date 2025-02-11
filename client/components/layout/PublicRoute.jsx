import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { isLoggedIn, token } = useAuth();
  const location = useLocation();

  if (isLoggedIn || token) {
    return <Navigate to="/quizz" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};