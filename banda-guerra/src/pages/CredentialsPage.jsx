import React, { useState } from 'react'
import SignInForm from '../components/SignInForm'
import RegisterForm from '../components/RegisterForm'
import './CredentialsPage.css'

const CredentialsPage = () => {
  const [isLogin, setIsLogin] = useState(true) // true: login, false: registro

  return (
    <div id='login-page'>
      <div className="register-wrapper">
        <h1 className="text-box register-title">
          {isLogin ? 'Iniciar Sesión' : 'Formulario de Registro'}
        </h1>
        <p className="text-box register-subtitle">
          {isLogin 
            ? 'Ingresa a tu cuenta y continúa tu entrenamiento.' 
            : 'Únete a nuestra comunidad y comienza tu entrenamiento.'}
        </p>
        
        <div className='credentials-form-card'>
          <div className='credentials-container'>
            {isLogin ? <SignInForm /> : <RegisterForm />}
          </div>

          <div className="credentials-form-footer">
            {isLogin ? (
              <p>
                ¿No tienes cuenta?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false) }}>
                  Regístrate aquí
                </a>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true) }}>
                  Inicia sesión aquí
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CredentialsPage