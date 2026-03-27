import React from "react";
import './Hero.css'

const Hero = ({id, bgImg, bgColor, title, desc, buttons}) => {
  
  const getBackgroundStyle = () => {
    if (bgImg) {
      return { backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    }
    return { backgroundColor: bgColor || '#833132' }
  }
  
  return (
    <div id={id} className="hero" style={getBackgroundStyle()}>
      <h1 className="">{title}</h1>
      <p className="">{desc}</p>
      {buttons && buttons.length > 0 && (
        <div className="hero-btns">
          {buttons.map((btn, index) => (
            <a key={index} className={btn.class || 'generic-btn'} href={btn.link}>
              {btn.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default Hero