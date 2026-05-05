import { useState } from "react"

export default function CarouselComponent({items, children}) {

    const [index, setIndex ] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState('')
    
    if (!items || items.length === 0) {
        return <div className='relative my-10 mx-auto max-w-300 flex items-center justify-center gap-5 p-5 bg-(--carousel-bg-color) rounded-[30px] shadow-2xl animate-bounce'>Cargando...</div>
    }
    
    const switchItem = (direction) => {
        if (isAnimating) return

        setIsAnimating(true)
        setDirection(direction === -1 ? 'left' : 'right')

        setTimeout(() => {
            setIndex(prev => {
                let newIndex = prev + direction
                if (newIndex < 0) newIndex = items.length - 1
                if (newIndex >= items.length) newIndex = 0
                return newIndex
            })

            setTimeout(() => {
                setIsAnimating(false)
                setDirection('')
            }, 400)
        }, 200)
    }

    const goToItem = (choice) => {
        if (isAnimating || choice === index) return

        const way = choice > index ? 'right' : 'left'
        setDirection(way)
        setIsAnimating(true)

        setTimeout(() => {
            setIndex(choice)
            setTimeout(() => {
                setIsAnimating(false)
                setDirection('')
            }, 400)
        }, 200)
    }
    

    return (
        <div className='relative my-10 mx-auto max-w-300 flex items-center justify-center gap-5 p-5 bg-linear-to-br from-[#f8f9fa] to-[#cfcfcf] rounded-[30px] shadow-2xl'>
            <button 
                className='btn-carousel hover:animate-bounce-left'
                onClick={() => switchItem(-1)}
                disabled={isAnimating}
                aria-label='Anterior'
                >
                    ←
            </button>
            <div className={`w-95 h-120 transition-all duration-40 ease-[cubic-bezier(0.4, 0, 0.2, 1)] relative ${isAnimating ? (direction === 'left' ? 'slide-out-left' : 'slide-out-right') : 'scale-fade-in'}`} >
                {children(items[index], index)}
            </div>
            <button 
                className='btn-carousel hover:animate-bounce-right'
                onClick={() => switchItem(1)}
                disabled={isAnimating}
                aria-label='Siguiente'
            >
                →
            </button>
            <div className='absolute -bottom-7.5 left-1/2 -translate-x-1/2 flex gap-3 z-10'>
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        className={`carousel-indicator ${idx === index ? 'active' : ''}`}
                        onClick={() => goToItem(idx)}
                        disabled={isAnimating}
                        aria-label={`Ver el item: ${idx + 1}`}
                    />
                ))}      
            </div>
        </div>
    )
}
