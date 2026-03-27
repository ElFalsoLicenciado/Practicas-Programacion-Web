import React, { useState } from 'react';
import CourseCard from './CourseCard'
import './CourseCarousel.css'

const CourseCarousel = ({ cursos }) => {
    const [index, setIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState('')
    
    if (!cursos || cursos.length === 0) {
        return <div className="carousel-empty">Cargando cursos...</div>
    }
    
    const cambiarCurso = (direccion) => {
        if (isAnimating) return
        
        setIsAnimating(true)
        setDirection(direccion === -1 ? 'left' : 'right')
        
        setTimeout(() => {
            setIndex(prev => {
                let newIndex = prev + direccion
                if (newIndex < 0) newIndex = cursos.length - 1
                if (newIndex >= cursos.length) newIndex = 0
                return newIndex
            })
            
            setTimeout(() => {
                setIsAnimating(false)
                setDirection('')
            }, 400)
        }, 200)
    }
    
    const irACurso = (indice) => {
        if (isAnimating || indice === index) return
        
        const direccion = indice > index ? 'right' : 'left'
        setDirection(direccion)
        setIsAnimating(true)
        
        setTimeout(() => {
            setIndex(indice)
            setTimeout(() => {
                setIsAnimating(false)
                setDirection('')
            }, 400)
        }, 200)
    }
    
    return (
        <div id='carousel'>
            <button 
                className='carousel-btn' 
                onClick={() => cambiarCurso(-1)}
                disabled={isAnimating}
                aria-label="Curso anterior"
            >
                ←
            </button>
            
            <div 
                id='carousel-content' 
                className={isAnimating ? 
                    (direction === 'left' ? 'slide-out-left' : 'slide-out-right') : 
                    'scale-fade-in'
                }
            >
                <CourseCard curso={cursos[index]} />
            </div>
            
            <button 
                className='carousel-btn' 
                onClick={() => cambiarCurso(1)}
                disabled={isAnimating}
                aria-label="Curso siguiente"
            >
                →
            </button>
            
            <div className="carousel-indicators">
                {cursos.map((_, idx) => (
                    <button
                        key={idx}
                        className={`indicator ${idx === index ? 'active' : ''}`}
                        onClick={() => irACurso(idx)}
                        disabled={isAnimating}
                        aria-label={`Ir al curso ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default CourseCarousel