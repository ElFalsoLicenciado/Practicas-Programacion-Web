import Hero from '../components/HeroComponent'
import Card from '../components/CardComponent'

export default function AboutUsView() {
    const about_us_cards = [
        {
            margin_top: "#4a90e2",
            type: 'descrip',
            title_text: 'Misión', 
            parr_text: 'Fomentar el patriotismo, la disciplina y el trabajo en equipo en la comunidad estudiantil, representando con honor y marcialidad a nuestra universidad en eventos cívicos, deportivos y culturales, a través de la ejecución impecable de toques y marchas militares.'
        },
        {
            margin_top: "#e2b84a",
            type: 'descrip',
            title_text: 'Visión', 
            parr_text: 'Ser reconocida como la mejor banda de guerra a nivel estatal y nacional dentro del ámbito universitario, destacando no solo por nuestra calidad técnica y acústica, sino por la integridad académica y moral de todos nuestros integrantes.'
        },
        {
            margin_top: "#e27c4a",
            type: 'list',
            title_text: 'Valores', 
            parr_text: ['Disciplina, constancia y rigor.','Lealtad y compromiso.','Compañerismo y apoyo mutuo.', 'Respeto a los símbolos.']
        },
    ]

    return (
        <div>
          <Hero
              bgColor='#833132c0'
              title='Nuestra filosofía'
              desc='A través de los redobles de los tambores y el toque de las cornetas, inculcamos el respeto por los símbolos patrios y el sentido de pertenencia a nuestra institución educativa.'
              className='mb-10'
          />
          <div>
                <div>
                    <h2 className='h2-title text-center'>Acerca de:</h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7.5 max-w-300 mx-auto my-15 p-5">
                    {about_us_cards.map((card, index) => (
                        <Card
                            key={index}
                            style={{ borderTopColor: card.margin_top }}
                             className="bg-white rounded-[15px] py-7.5 px-6.25 text-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out border-t-4 border-solid h-full flex flex-col items-center cursor-default hover:-translate-y-2.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
>
                            <h2 className="text-[1.8rem] font-bold font-[Roboto,sans-serif] text-[#333] mb-5 relative -block after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-12.5 after:h-0.75 after:bg-[#833132] after:rounded ">
                            {card.title_text} 
                            </h2>

                            {card.type === "list" ? (
                            <ul className='list-none p-0 mt-3.75 text-left'>
                                {card.parr_text.map((item, i) => (
                                <li key={i} className="text-[1.15rem] leading-[1.6] font-[Josefin_Sans,sans-serif] text-[#666] py-2 relative pl-6.25 before:content-['✓'] before:absolute before:left-0 before:text-[#833132] before:font-bold before:text-[1.1rem]">{item}</li>
                                ))}
                            </ul>
                            ) : (
                            <p className='text-[1.15rem] leading-[1.6] font-[Josefin_Sans,sans-serif] text-[#666] text-center mt-3.75'>
                                {card.parr_text}
                            </p>
                            )}
                        </Card>
                        ))}
                </div>
          </div>
        </div>  
    )
}
