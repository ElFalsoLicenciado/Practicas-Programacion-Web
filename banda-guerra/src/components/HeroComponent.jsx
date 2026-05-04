import { useNavigate } from "react-router-dom"

export default function Hero(props) {
    const navigate = useNavigate();

    const getBackgroundStyle = () => {
        if (props.bgImg) {
            return { backgroundImage: `url(${props.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center'  }
        }
        return { backgroundColor: props.bgColor || '#833132'}
    }

    return (
        <div className={`bg-cover bg-center w-full max-h-125 px-4 py-4 flex flex-col justify-center align-middle items-center ${props.class}`} style={getBackgroundStyle()}>
            <h1 className='hero-h1'>{props.title}</h1>
            <p className='hero-p'>{props.desc}</p>
            {
                props.buttons && props.buttons.length > 0  && (
                    <div className='hero-btns'>
                        {
                            props.buttons.map((btn, index) => (
                                <button key={index} className={btn.class || 'generic-btn'} onClick={() => navigate(btn.link, { state: btn.state})}>{btn.label}</button>
                            ))
                        }
                    </div>       
                )
            }
        </div>
      )
}
