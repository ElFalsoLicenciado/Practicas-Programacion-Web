import React from 'react'
import Hero from '../components/Hero'
import useCursos from '../hooks/useCursos'
import CourseCarousel from '../components/CourseCarousel'

import './HomePage.css'


const botones = [
    {class: 'hero-btn', link: '/login', label: 'CREAR CUENTA'},
    {class: 'hero-btn', link: '/about-us', label: 'INFORMES'}
]

const HomePage = () => {
    const { cursos } = useCursos();

    console.log(cursos)
    return (
        <>
            <Hero
                bgImg="https://images.unsplash.com/photo-1663380984443-bc88fe4bb2ba"
                title="Página de cursos virtuales de banda de guerra."
                desc='Plataforma "oficial" para aprender diversas cosas que pues se aprenden en banda de guerra ayuda.'
                buttons={botones}
                />
            <div id='catalogo'>
                <div>
                    <h2 id='catalogo-h2'>Cursos disponibles:</h2>
                </div>
                <CourseCarousel cursos={cursos}/>
            </div>
        </>
    )
}

export default HomePage