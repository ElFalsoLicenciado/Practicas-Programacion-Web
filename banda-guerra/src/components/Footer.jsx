import react from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div id="footer">
            <p> Validaciones </p>
            <div id="validations-section">
                <p>
                    <a href="https://validator.w3.org/check?uri=referer">
                        <img src="https://www.w3.org/Icons/valid-html401" alt="Valid HTML 4.01 Transitional" height="31" width="88"/>
                    </a>
                </p>
                <p>
                    <a href="https://jigsaw.w3.org/css-validator/check/referer">
                        <img style={{border:0, width:'88px',height:'31px'}} src="https://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS"/>
                    </a>
                </p>
            </div>
            <div id="copyright-footer">
                <p>© 2026 Banda de Guerra TECNM. Todos los derechos reservados.</p>
            </div>
        </div>
    )
}

export default Footer