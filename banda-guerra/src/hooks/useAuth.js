import { useEffect, useState } from "react";

export default function useAuth() {

    const [session, setSession] = useState(null);

    useEffect(() => {

        const stored =
            localStorage.getItem('session');

        if (stored) {
            setSession(JSON.parse(stored));
        }

    }, []);

    const login = (userData) => {

        localStorage.setItem(
            'session',
            JSON.stringify(userData)
        );

        setSession(userData);
    };

    const logout = () => {

        localStorage.removeItem('session');

        setSession(null);
    };

    const hasRole = (...roles) => {

        if (!session) return false;

        return roles.includes(session.role);
    };

    return {
        session,
        login,
        logout,
        hasRole,
        isAuthenticated: !!session
    };
}