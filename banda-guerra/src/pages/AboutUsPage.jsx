import React from "react";

const about_us_cards = [
    {
        type: 'descrip',
        card_color: '',
        card_border: '', 
        card_h2: 'Misión', 
        card_p: 'Fomentar el patriotismo, la disciplina y el trabajo en equipo en la comunidad estudiantil, representando con honor y marcialidad a nuestra universidad en eventos cívicos, deportivos y culturales, a través de la ejecución impecable de toques y marchas militares.'
    },
    {
        type: 'descrip',
        card_color: '', 
        card_border: '', 
        card_h2: 'Visión', 
        card_p: 'Ser reconocida como la mejor banda de guerra a nivel estatal y nacional dentro del ámbito universitario, destacando no solo por nuestra calidad técnica y acústica, sino por la integridad académica y moral de todos nuestros integrantes.'
    },
    {
        type: 'lista',
        card_color: '', 
        card_border: '', 
        card_h2: 'Valores', 
        card_p: ['Disciplina, constancia y rigor.','Lealtad y compromiso.','Compañerismo y apoyo mutuo.', 'Respeto a los símbolos.']
    },
]

const AboutUsPage = () => {
    
    return (
        <div id='about-us-page'>
            <h1 className='h1-title'>Nuestra filosofía</h1>

        </div>
    )
}

export default AboutUsPage