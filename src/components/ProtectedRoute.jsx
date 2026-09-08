import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;