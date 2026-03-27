import React from 'react';
import './AboutCard.css'

const AboutCard = ({ card }) => {
    if (!card) return null

    const renderContent = () => {
        if (card.type === 'lista') {
            return (
                <ul className="about-us-card-list">
                    {card.card_p.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )
        }
        
        return <p className="about-us-card-p">{card.card_p}</p>
    }

    const getIcon = () => {
        switch(card.card_h2) {
            case 'Misión':
                return '🎯'
            case 'Visión':
                return '👁️'
            case 'Valores':
                return '⭐'
            default:
                return '📌'
        }
    }

    const getBorderColor = () => {
        switch(card.card_h2) {
            case 'Misión':
                return '#4a90e2'
            case 'Visión':
                return '#e2b84a'
            case 'Valores':
                return '#e27c4a'
            default:
                return '#833132'
        }
    }

    return (
        <div className="about-us-card" style={{ borderTopColor: getBorderColor() }}>
            <div className="about-us-card-icon">
                <span className="about-us-card-icon-emoji">{getIcon()}</span>
            </div>
            <div className="about-us-card-content">
                <h2 className="about-us-card-h2">{card.card_h2}</h2>
                {renderContent()}
            </div>
        </div>
    )
}

export default AboutCard