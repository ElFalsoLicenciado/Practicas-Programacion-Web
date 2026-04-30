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
        <h1 className='text-5xl font-bold text-center'>HOME</h1>
    </>
  )
}
