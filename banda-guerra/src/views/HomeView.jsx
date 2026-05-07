import Carousel from "../components/CarouselComponent";
import Hero from "../components/HeroComponent";
import Card from "../components/CardComponent";
import useCursos from "../services/useCursos";
import { useNavigate } from "react-router-dom";


export default function HomeView() {
  
  const botones = [
    {class: 'hero-btn', link: '/credentials', label: 'CREAR CUENTA', state: { isLogin : false}},
    {class: 'hero-btn' ,link: '/about-us', label: 'INFORMES'}
  ]

  const navigate = useNavigate();
  const {cursos} = useCursos(); 
  
  const goTo = (curso) => {
    navigate(`/course/${curso.id}`);
  }
  
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
            <Carousel items={cursos}>
              {(item) => (
                <Card className="flex flex-col items-center text-center w-full h-full bg-linear-to-br from-white to-[#f8f9fa] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-400 ease-in-out relative cursor-pointer hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.25 before:bg-linear-to-r before:from-[#833132] before:via-[#b34a4b] before:to-[#833132] before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100" onClick={() => goTo(item)}>
                  <div className="w-full h-55 bg-linear-to-br from-[#833132] to-[#b34a4b] flex items-center justify-center relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-linear-to-br after:from-[#83313233] after:to-black/10 after:opacity-0 after:transition-opacity group-hover:after:opacity-100">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="size-32.5 rounded-full object-cover border-4 border-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-300 z-10 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)]" 
                    />
                  </div>
                  <h3 className="text-[1.4rem] font-bold font-[Roboto,sans-serif] text-[#2c3e50] mx-3.75 mt-5 mb-2.5 px-2.5 wrap-break-words relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-0.75 after:bg-linear-to-r after:from-[#833132] after:to-[#b34a4b] after:rounded after:transition-all group-hover:after:w-15">{item.title}</h3>
                  <p className="text-[0.95rem] leading-normal text-[#6c757d] font-(family-name:--font-poppins) mx-5 mt-3.75 mb-6.25 text-center wrap-break-words line-clamp-3">{item.description}</p>
                </Card>
              )}
            </Carousel>
        </div>
    </>
  )
}
