import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loginConfig, registerConfig } from '../forms'
import Form from "../components/FormBuilder";
import useUsers from '../services/useUsers'
import {useAuth} from '../context/AuthContext'

export default function CredentialsView() {

  const location = useLocation();
  const auth = useAuth();

  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);

  const { registerUser, usernameExists, emailExists } = useUsers();

  const loginFormConfig = loginConfig({login: auth.login})
  const registerFormConfig = registerConfig({registerUser, usernameExists, emailExists, login: auth.login});

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
        config={isLogin ? loginFormConfig : registerFormConfig} 
        formFooter={{text: isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?', linkText: isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí', onClick: (e) => {e.preventDefault(); setIsLogin(!isLogin) }}}/>
    </div>
  );
} 