import { Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';

const ProtectedRoute = ({ children }) =>
  authStore.isAuthenticated() ? children : <Navigate to="/login" replace />;

export default ProtectedRoute;
