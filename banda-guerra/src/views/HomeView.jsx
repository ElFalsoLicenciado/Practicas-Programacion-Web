import Carousel from "../components/CarouselComponent";
import Hero from "../components/HeroComponent";

export default function HomeView() {
  
  const botones = [
    {class: 'hero-btn', link: '/login', label: 'CREAR CUENTA'},
    {class: 'hero-btn' ,link: '/about-us', label: 'INFORMER'}
  ]
  
  return (
    <>
        <Hero 
            bgImg='https://images.unsplash.com/photo-1663380984443-bc88fe4bb2ba'
            title='Página de cursos virtuales de banda de guerra'
            desc='Plataforma "oficial" para aprender diversas cosas que pues se aprenden en banda de guerra ayuda.'
            buttons={botones}/>
        {/* Catalogo */}
        <div className='justify-center align-middle items-center p-10'>
            <h2 className='mx-auto my-5 max-w-100 text-center text-[#833132] text-(length:--h2-title-font-size) font-bold font-(family-name:--font-roboto)'>Cursos disponibles</h2>
            <Carousel/>
        </div>
    </>
  )
}
