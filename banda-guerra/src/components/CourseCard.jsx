import React from "react";
import { useNavigate } from "react-router-dom";
import './CourseCard.css'

const CourseCard = ({ curso }) => {
    const navigate = useNavigate();

    if (curso==null) return (
        <div>Cargando servicios...</div>
    )

    const goToCurso = () => {
        navigate(`/course/${curso.nombre.toLowerCase()}`);
}

    return (
        <div className='curso-card' onClick={(goToCurso)}>
            <div id='img-container'>
                <img src={curso.img} alt={curso.nombre}/>
            </div>
            <h3>{curso.nombre}</h3>
            <p id='course-desc'>{curso.desc}</p>
        </div>
    )
}

export default CourseCard