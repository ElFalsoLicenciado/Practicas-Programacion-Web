import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles, noLogin, noRole ,children }) => {
    
    if (!user) return <Navigate to={noLogin} />;

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={noRole} />;
    }

    return children;
};

export default ProtectedRoute;