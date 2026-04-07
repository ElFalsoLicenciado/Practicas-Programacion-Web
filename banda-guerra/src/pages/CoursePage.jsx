import React from "react";
import { useParams } from "react-router-dom";
import useCursos from "../hooks/useCursos";
const CoursePage = () => {

    const { id } = useParams();
    const { getCursoByName, loading } = useCursos();

    if (loading) {
        return <div>Cargando curso...</div>
    }

    const curso = getCursoByName(id);

    if(!curso) {
        return <div>Not found</div>
    }
    
    return (
        <div id='course-page'>
            <h1 className='h1-title'>{curso.nombre}</h1>
            <p className='p-text'>{curso.desc}</p>
        </div>
    )
}

export default CoursePage