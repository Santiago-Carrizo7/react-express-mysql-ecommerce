import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.jsx";
import { Spinner } from "./spinner/Spinner.jsx";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <Spinner />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
