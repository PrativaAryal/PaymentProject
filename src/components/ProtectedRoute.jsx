import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // logged in, render the protected page
  return children;
};

export default ProtectedRoute;
