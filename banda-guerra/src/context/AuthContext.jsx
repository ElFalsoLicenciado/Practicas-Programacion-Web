import { createContext, useContext, useEffect, useState } from 'react';

import { apiFetch } from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [session, setSession] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {

        try {

            const response = await apiFetch(
                '/api/auth/me'
            );

            if (!response.ok) {

                setSession(null);

                return;
            }

            const data = await response.json();

            setSession(data);

        } catch {

            setSession(null);

        } finally {

            setLoading(false);
        }
    };

    const login = async (
        credential,
        password
    ) => {

        const response = await apiFetch(
            '/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credential,
                    password
                })
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                'Credenciales inválidas'
            );
        }

        setSession(data);

        return data;
    };

    const logout = async () => {

        await apiFetch(
            '/api/auth/logout',
            {
                method: 'POST'
            }
        );

        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                loading,
                login,
                logout,
                isAuthenticated: !!session
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(AuthContext);
}
