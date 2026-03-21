import { React } from "react";
import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <>
        <div id="header-base">
            <div id="header-brand">
                <div id="header-logo" onClick={() => window.location.href = '/'}>
                    <img src="src/assets/img/bdg1.jpg" alt="Logo TECNM Morelia" id="logo-img"/>
                <div id="header-title">BANDA DE GUERRA TECNM</div>
                </div>
            </div>
            <div id="header-links">
                <Link to="/login" className="header-link">Iniciar sesion</Link>
                <Link to="/admin" className="header-link">Administracion</Link>
                <Link to="/about-us" className="header-link">Acerca de nosotros</Link>
            </div>
        </div>
        </>
    )
}

export default Header