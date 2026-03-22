import React from "react";
import './Hero.css'

const Hero = ({bgImg, title, desc, buttons}) => {
    return (
        <div id="hero" style={{ backgroundImage: `url(${bgImg})`}}>
            <h1 className="text-box">{title}</h1>
            <p className="text-box">{desc}</p>
            <div className="hero-btns">
                {buttons.map((btn, index) => (
                    <a 
                        key={index} 
                        className={btn.class || 'generic-btn'}
                        href={btn.link}>
                        {btn.label}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Hero