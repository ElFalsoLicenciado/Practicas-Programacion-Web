import { useEffect, useState } from "react";
import { apiFetch } from '../api/api';

const API = '/api/courses';

const useCursos = () => {
    
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchCursos();
    }, []);
    
    const fetchCursos = async () => {
        
        try {
            
            const response = await apiFetch(API);
            
            if (!response.ok) {
                throw new Error('Error al cargar cursos');
            }
            
            const data = await response.json();
            
            setCursos(data);
            
        } catch (error) {
            
            console.error(error);
            
        } finally {
            
            setLoading(false);
        }
    };
    
    const getCursoById = async (id) => {
        
        const response = await apiFetch(`${API}/${id}`);
        
        if (!response.ok) {
            throw new Error('Curso no encontrado');
        }
        
        return await response.json();
    };
    
    const addCurso = async (curso) => {
        
        const response = await apiFetch(`${API}/admin/add`, {
            method: 'POST',
            body: JSON.stringify(curso)
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar curso');
        }
        
        await fetchCursos();
    };
    
    const updateCurso = async (id, curso) => {
        
        const response = await apiFetch(`${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(curso)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar curso');
        }
        
        await fetchCursos();
    };
    
    const deleteCurso = async (id) => {
        
        const response = await apiFetch(`${API}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar curso');
        }
        
        await fetchCursos();
    };
    
    const joinCourse = async (userId, courseId) => {
        
        const response = await apiFetch(
            `${API}/${courseId}/join/${userId}`,
            {
                method: 'POST'
            }
        );
        
        if (!response.ok) {
            throw new Error(
                'Error al inscribirse'
            );
        }
        
        return await response.json();
    };
    
    const isOnCourse = async (
        userId,
        courseId
    ) => {
        
        const response = await apiFetch(
            `${API}/${courseId}/joined/${userId}`
        );
        
        if (!response.ok) {
            throw new Error(
                'Error al verificar inscripción'
            );
        }
        
        return await response.json();
    };
    
    return {
        cursos,
        loading,
        fetchCursos,
        getCursoById,
        addCurso,
        updateCurso,
        deleteCurso,
        joinCourse,
        isOnCourse
    };
};

export default useCursos;