// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            {/* header-base */}
            <div className='grid grid-cols-2 bg-[#833132] bg-cover items-stretch sticky top-0 z-10'>
                {/* header-brand */}
                <div className='flex justify-start text-center align-middle h-max'>
                    {/* header-logo*/}
                    <div className='flex items-center cursor-pointer mt-1.5 ml-2.5'>
                        {/* logo-img */}
                        <img className='border-[#660708] border-[6px] rounded-[50%] h-17.5 w-auto mb-2.5 mt-1.5' src="/bdg1.jpg" alt="Logo" id="logo-img"/>
                        {/*header-title*/}
                        <div className='flex items-center justify-center poppins-txt text-white font-semibold text-center mb-2.5 ml-2.5 text-(length:--header-title-font-size)'>
                            BANDA DE GUERRA TECNM
                        </div>
                    </div>
                </div>
                {/* header-links */}
                <div className='flex justify-end w-full text-center align-middle'>
                    <Link to={'/login'} className='header-link'>Iniciar sesion</Link>
                    <Link to={'/admin'} className='header-link'>Administracion</Link>
                    <Link to={'/about-us'} className='header-link'>Acerca de nosotros</Link> 
                </div>
            </div>
        </>
    )
}