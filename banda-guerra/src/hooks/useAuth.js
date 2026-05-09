import { useEffect, useState } from "react";
import { apiFetch } from '../api/api';

const API = '/api/auth';

export default function useAuth() {

    const [session, setSession] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {

        try {

            const response = apiFetch(`${API}/me`);

            if (!response.ok) {

                setSession(null);

                return;
            }

            const data = await response.json();

            setSession(data);

        } catch (err) {

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
            `${API}/login`,
            {
                method: 'POST',
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
    };

    const logout = async () => {

        await apiFetch(
            `${API}/logout`,
            {
                method: 'POST'
            }
        );

        setSession(null);
    };

    return {
        session,
        loading,
        login,
        logout,
        isAuthenticated: !!session
    };
}