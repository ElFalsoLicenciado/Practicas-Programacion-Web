import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

export default function Header() {
    const navigate = useNavigate();

    const {session, logout } = useAuth();

    const handleLogout = () => {
        logout();

        navigate('/');
    }
    return (
        <>
            {/* header-base */}
            <div className='grid grid-cols-2 bg-[#833132] bg-cover items-stretch sticky top-0 z-10'>
                {/* header-brand */}
                <div className='flex justify-start text-center align-middle h-max'>
                    {/* header-logo*/}
                    <div className='flex items-center cursor-pointer mt-1.25 ml-2.5' onClick={() => navigate('/')}>
                        {/* logo-img */}
                        <img className='border-[#660708] border-[6px] rounded-[50%] h-17.5 w-auto mb-2.5' src="/bdg1.jpg" alt="Logo" id="logo-img"/>
                        {/*header-title*/}
                        <div className='flex items-center justify-center poppins-txt text-white font-semibold text-center mb-2.5 ml-2.5 text-(length:--header-title-font-size)'>
                            BANDA DE GUERRA TECNM
                        </div>
                    </div>
                </div>
                {/* header-links */}
                <div className='flex justify-end w-full text-center align-middle'>
                    {!session && (
                        <Link to={'/credentials'} state={{isLogin:true}} className='header-link'>Iniciar sesion</Link>
                    )}
                    {session && (
                        <div className='relative group flex items-center px-5 font-[Poppins] text-[clamp(0.95rem,2.5vw,1.2rem)] text-[#f5cbcc] hover:bg-black/25 hover:text-white transition-all cursor-pointer'>
                            <div className='flex gap-2 items-center h-full'>
                                <span>👤</span>
                                <span>
                                    {session.username}
                                </span>
                            </div>
                            {/* DROPDOWN */}
                            <div className='absolute top-full right-0 min-w- [180px] bg-white rounded-xl shadow-lg py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50'>
                                <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-[#333] hover:bg-[#f5e6e6] hover:text-[#660708] transition-all'>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                    {session?.role === 'admin' && (
                        <Link to={'/admin'} className='header-link'>Administracion</Link>
                    )}
                    <Link to={'/about-us'} className='header-link'>Acerca de nosotros</Link> 
                </div>
            </div>
        </>
    )
}