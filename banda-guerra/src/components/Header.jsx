import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUsuarios from "../hooks/useUsuarios";
import './Header.css';

const Header = () => {
    const { getCurrentUser } = useUsuarios();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
        console.log(user);
    }, []);

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    }
    

    return (
        <div id="header-base">
            <div id="header-brand">
                <div id="header-logo" onClick={() => window.location.href = '/'}>
                    <img src="src/assets/img/bdg1.jpg" alt="Logo" id="logo-img"/>
                    <div id="header-title">BANDA DE GUERRA TECNM</div>
                </div>
            </div>

            <div id="header-links">
                
                {!user ? (
                    <Link to="/login" className="header-link">
                        Iniciar sesión
                    </Link>
                ) : (
                    <div className="user-menu ">
                        <span>👤</span>
                        <span>{user.username}</span>
                        <div className="dropdown">
                            <Link to="/profile">Ver perfil</Link>
                            <button onClick={logout}>Cerrar sesión</button>
                        </div>
                    </div>
                )}

                <Link to="/admin" className="header-link">Administración</Link>
                <Link to="/about-us" className="header-link">Acerca de nosotros</Link>
            </div>
        </div>
    );
}

export default Header;