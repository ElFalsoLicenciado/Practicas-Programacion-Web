import React, { useState } from 'react';
import CourseCard from './CourseCard'
import './CourseCarousel.css'

const CourseCarousel = ({ cursos }) => {
    const [index, setIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    
    const cambiarCurso = (direccion) => {
        if (isAnimating) return
        
        setIsAnimating(true)
        
        setTimeout(() => {
            setIndex(prev => {
                let newIndex = prev + direccion
                if (newIndex < 0) newIndex = cursos.length - 1
                if (newIndex >= cursos.length) newIndex = 0
                return newIndex
            })

            setTimeout(() => setIsAnimating(false), 400)
        }, 200)

        if (!cursos.length) return <div>Cargando los cursos...</div>
    }

    return (
        <div id='carousel'>
            <button className='carousel-btn' onClick={() => cambiarCurso(-1)}>
                ←
            </button>
            <div id='carousel-content' className={isAnimating ? 'scale-fade-in' : ''}>
                <CourseCard curso={cursos[index]}/>
            </div>
            <button className='carousel-btn' onClick={() => cambiarCurso(1)}>
                →
            </button>
        </div>
    )
}

export default CourseCarousel