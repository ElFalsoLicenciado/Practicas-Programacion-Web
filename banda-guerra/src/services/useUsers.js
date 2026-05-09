import { useEffect, useState } from "react";
import { apiFetch } from '../api/api';

const API = "/api/users";

export default function useUsers() {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        
        try {
            
            const response = await apiFetch(API);
            
            if (!response.ok) {
                throw new Error("Error al obtener usuarios");
            }
            
            const data = await response.json();
            
            setUsers(data);
            
        } catch (err) {
            
            console.error(err);
            
        } finally {
            
            setLoading(false);
        }
    };
    
    const getUserById = async (id) => {
        
        const response = await apiFetch(`${API}/${id}`);
        
        if (!response.ok) {
            throw new Error("Error al obtener usuario");
        }
        
        return await response.json();
    };
    
    const addUser = async (user) => {
        
        const response = await apiFetch(`${API}/admin/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        
        if (!response.ok) {
            throw new Error("Error al agregar usuario");
        }
        
        await fetchUsers();
    };
    
    const registerUser = async (user) => {
        
        const response = await apiFetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        
        if (!response.ok) {
            throw new Error("Error al registrar usuario");
        }
        
        return await response.json();
    };
    
    const updateUser = async (id, user) => {
        
        const response = await apiFetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        
        if (!response.ok) {
            throw new Error("Error al actualizar");
        }
        
        await fetchUsers();
    };
    
    const deleteUser = async (id) => {
        
        const response = await apiFetch(`${API}/${id}`, {
            method: "DELETE"
        });
        
        if (!response.ok) {
            throw new Error("Error al eliminar");
        }
        
        await fetchUsers();
    };
    
    const usernameExists = async (username) => {
        
        const response = await apiFetch(
            `${API}/exists/username/${encodeURIComponent(username)}`
        );
        
        if (!response.ok) {
            throw new Error('Error al validar username');
        }
        
        return await response.json();
    };
    
    const emailExists = async (email) => {
        
        const response = await apiFetch(
            `${API}/exists/email/${encodeURIComponent(email)}`
        );
        
        if (!response.ok) {
            throw new Error('Error al validar email');
        }
        
        return await response.json();
    };
    
    return {
        users,
        loading,
        fetchUsers,
        getUserById,
        addUser,
        registerUser,
        updateUser,
        deleteUser,
        usernameExists,
        emailExists
    };
}