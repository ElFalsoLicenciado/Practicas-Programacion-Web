import Hero from '../components/HeroComponent'

export default function AboutUsView() {
    return (
        <div>
          <Hero
              bgColor='#833132c0'
              title='Nuestra filosofía'
              desc='A través de los redobles de los tambores y el toque de las cornetas, inculcamos el respeto por los símbolos patrios y el sentido de pertenencia a nuestra institución educativa.'
              class='mb-10'
          />
        </div>  
    )
}
