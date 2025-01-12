import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Fix import path

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;