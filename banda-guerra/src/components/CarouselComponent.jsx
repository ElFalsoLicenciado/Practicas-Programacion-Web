import { useState } from "react"
import Card from './CardComponent'

export default function CarouselComponent(props) {

    const [index, setIndex ] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState('')
    
    if (!props.items || props.items.length === 0) {
        return <div class='relative my-40 mx-auto max-w-300 flex items-center gap-5 p-5 text-center justify-center shadow-2xl' >Cargando...</div>
    }
    
    const switchItem = (direction) => {
        if (isAnimating) return

        setIsAnimating(true)
        setDirection(direction === -1 ? 'left' : 'right')

        setTimeout(() => {
            setIndex(prev => {
                let newIndex = prev + direction
                if (newIndex < 0) newIndex = props.items.length - 1
                if (newIndex >= props.items.length) newIndex = 0
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
        <div>
            <button>

            </button>
            <div>
                <Card/>
            </div>
            <button>

            </button>
            <div>
                
            </div>
        </div>
    )
}
