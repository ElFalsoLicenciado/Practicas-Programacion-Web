import { useEffect, useState } from "react";

const API = 'http://localhost:8080/api/courses';

const useCursos = () => {
    
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchCursos();
    }, []);
    
    const fetchCursos = async () => {
        
        try {
            
            const response = await fetch(API);
            
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
        
        const response = await fetch(`${API}/${id}`);
        
        if (!response.ok) {
            throw new Error('Curso no encontrado');
        }
        
        return await response.json();
    };
    
    const addCurso = async (curso) => {
        
        const response = await fetch(`${API}/admin/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar curso');
        }
        
        await fetchCursos();
    };
    
    const updateCurso = async (id, curso) => {
        
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar curso');
        }
        
        await fetchCursos();
    };
    
    const deleteCurso = async (id) => {
        
        const response = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar curso');
        }
        
        await fetchCursos();
    };
    
    const joinCourse = async (userId, courseId) => {
        
        const response = await fetch(
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
        
        const response = await fetch(
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