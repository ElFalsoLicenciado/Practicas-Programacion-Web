import React from 'react'
import Hero from '../components/Hero'
import CourseCard from '../components/CourseCard'
import './HomePage.css'

const botones = [
    {class: 'hero-btn', link: '/login', label: 'CREAR CUENTA'},
    {class: 'hero-btn', link: '/about-us', label: 'INFORMES'}
]

const cursos = []

const HomePage = () => {
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
            </div>
            
        </>
    )
}

export default HomePage