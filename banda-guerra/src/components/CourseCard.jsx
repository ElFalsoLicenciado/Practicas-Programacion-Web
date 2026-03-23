import React from "react";
import './CourseCard.css'

const CourseCard = ({ curso }) => {
    if (curso==null) return (
        <div>Cargando servicios...</div>
    )

    return (
        <div className='curso-card' onClick={() => window.location.href = '/course'}>
            <div id='img-container'>
                <img src={curso.img} alt={curso.nombre}/>
            </div>
            <h3>{curso.nombre}</h3>
            <p id='desc'>{curso.desc}</p>
        </div>
    )
}

export default CourseCard