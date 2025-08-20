import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRoles } from "../types/Usertypes.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.role) ? children : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
