import { Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

export default function ProtectedRoute({
    children,
    allowedRoles = [],
    requireAuth = true
}) {

    const { session } = useAuth();

    if (!requireAuth && session) {
        return <Navigate to='/' replace />;
    }

    if (requireAuth && !session) {
        return <Navigate to='/credentials' replace />;
    }

    // VALIDAR ROLES
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(session?.role)
    ) {
        return <Navigate to='/' replace />;
    }

    return children;
}