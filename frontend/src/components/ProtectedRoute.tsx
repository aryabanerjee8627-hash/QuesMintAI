import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();

  if (loading) return <p className="p-8 text-sm">Loading...</p>;
  if (!session) return <Navigate to="/auth" replace />;
  return children;
}
