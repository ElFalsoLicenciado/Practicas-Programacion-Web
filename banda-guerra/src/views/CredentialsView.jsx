import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loginConfig, registerConfig } from '../forms'
import Form from "../components/FormBuilder";
import useUsers from '../services/useUsers'

export default function CredentialsView() {

  const location = useLocation();

  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);

  const { registerUser, usernameExists, emailExists } = useUsers();

  const registerFormConfig = registerConfig({registerUser, usernameExists, emailExists});

  return (
    <div>
      <h1 className='h1-title'>
        {isLogin ? 'Iniciar sesión' : 'Crear una cuenta'}
      </h1>
      <p className='p-text'>
        {isLogin ? 'Ingresa a tu cuenta y continúa tu entrenamiento' : 'Únete a nuestra comunidad y comienza tu entrenamiento'}
      </p>

      <Form 
        key={isLogin ? 'log-in' : 'sign-in'} 
        config={isLogin ? loginConfig : registerFormConfig} 
        formFooter={{text: isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?', linkText: isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí', onClick: (e) => {e.preventDefault(); setIsLogin(!isLogin) }}}/>
    </div>
  );
} 