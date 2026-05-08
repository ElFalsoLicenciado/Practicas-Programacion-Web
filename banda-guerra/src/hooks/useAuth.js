import { useEffect, useState } from "react";

export default function useAuth() {

    const [session, setSession] = useState(() => {

        const stored =
            localStorage.getItem('session');

        return stored
            ? JSON.parse(stored)
            : null;
    });

    const login = (user) => {

        localStorage.setItem(
            'session',
            JSON.stringify(user)
        );

        setSession(user);
    };

    const logout = () => {

        localStorage.removeItem('session');

        setSession(null);
    };

    return {
        session,
        login,
        logout,
        isAuthenticated: !!session
    };
}