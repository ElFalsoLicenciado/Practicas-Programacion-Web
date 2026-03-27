import React from "react";
import AboutCard from '../components/AboutCard'
import Hero from '../components/Hero'
import './AboutUsPage.css'

const about_us_cards = [
    {
        type: 'descrip',
        card_h2: 'Misión', 
        card_p: 'Fomentar el patriotismo, la disciplina y el trabajo en equipo en la comunidad estudiantil, representando con honor y marcialidad a nuestra universidad en eventos cívicos, deportivos y culturales, a través de la ejecución impecable de toques y marchas militares.'
    },
    {
        type: 'descrip',
        card_h2: 'Visión', 
        card_p: 'Ser reconocida como la mejor banda de guerra a nivel estatal y nacional dentro del ámbito universitario, destacando no solo por nuestra calidad técnica y acústica, sino por la integridad académica y moral de todos nuestros integrantes.'
    },
    {
        type: 'lista',
        card_h2: 'Valores', 
        card_p: ['Disciplina, constancia y rigor.','Lealtad y compromiso.','Compañerismo y apoyo mutuo.', 'Respeto a los símbolos.']
    },
]

const AboutUsPage = () => {
    
    return (
        <div id='about-us-page'>
            <Hero
                id='about-us-hero'
                bgColor= '#833132c0' 
                title='Nuestra filosofía' 
                desc='A través de los redobles de los tambores y el toque de las cornetas, inculcamos el respeto por los símbolos patrios y el sentido de pertenencia a nuestra institución educativa.'
            />
            <div id='about-us-values'>
                <div>
                    <h2 className='h2-title'>Acerca de:</h2>
                </div>
                <div id='about-us-showcase'>
                    {about_us_cards.map((about_us_card, index) => (
                        <AboutCard card={about_us_card} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage