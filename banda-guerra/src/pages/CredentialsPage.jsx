import React, { useState } from 'react'
import SignInForm from '../components/SignInForm'
import RegisterForm from '../components/RegisterForm'
import useUsuarios from '../hooks/useUsuarios'
import './CredentialsPage.css'

const CredentialsPage = () => {
  const {addUser, resetUsers, login, checkUsername} = useUsuarios()

  const handleUsuarioAgregado = (nuevoUsuario) => {
    return addUser(nuevoUsuario)
  }

  const handleResetUsuarios = () => {
    resetUsers()
  }

  const handleLogin = (credField, passField) => {
    return login(credField, passField)
  }

  const handleCheckUsername = (username) => {
    return checkUsername(username);
  }

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div id='credentials-page'>
        <h1 className="h1-title"> 
          {isLogin ? 'Iniciar Sesión' : 'Crear una cuenta'}
        </h1>
        <p className="p-text">
          {isLogin 
            ? 'Ingresa a tu cuenta y continúa tu entrenamiento.' 
            : 'Únete a nuestra comunidad y comienza tu entrenamiento.'}
        </p>
        <div className='form-container'>
          <div className='form'>
            <div>
              {isLogin ? <SignInForm 
                onLogin={handleLogin}
              /> : 
              <RegisterForm 
                onUsuarioAgregado={handleUsuarioAgregado}
                onCheckUsername={handleCheckUsername}
              />}
            </div>

            <div className="form-footer">
              {isLogin ? (
                <p>¿No tienes cuenta?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false) }}>Regístrate aquí</a>
                </p>
              ) : (
                <p>¿Ya tienes cuenta?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true) }}>Inicia sesión aquí </a>
                </p>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default CredentialsPage