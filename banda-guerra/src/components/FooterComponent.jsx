export default function Footer() {
    return (
        <>
            {/* Footer */}
            <div className='justify-center align-middle items-center pt-5 pl-10 pr-10 pb-10 bg-[#313131]'>
                <p className='flex justify-center footer-p'> Validaciones </p>
                {/* validations-section */}
                <div className='flex justify-center mb-5'>
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
                <div className='justify-center border-t border-[#6e6e6e]'>
                    <p className='text-center footer-p mt-1'>© 2026 Banda de Guerra TECNM. Todos los derechos reservados.</p>
                </div>
            </div>
        </>
    )
}