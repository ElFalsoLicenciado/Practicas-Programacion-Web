import { useState } from "react"
import Form from '../components/FormComponent'
import LoginFields from '../components/LoginFields'

export default function CredentialsView() {
  
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div>
        <h1 className='h1-title'>
          {isLogin ? 'Iniciar sesión' : 'Crear una cuenta'}
        </h1>
        <p className='p-text'>
            {isLogin ? 'Ingresa a tu cuenta y continúa tu entrenamiento' : 'Únete a nuestra comunidad y comienza tu entrenamiento'}
        </p>
          <Form
            formFooter={{
            text: isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?',
            linkText: isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí',
            onClick: (e) => {
              e.preventDefault(); setIsLogin(!isLogin) }
          }}>
            {isLogin ? (
              <LoginFields />
            ) : (
              <RegisterFields />
              )}
          </Form>
    </div>
  )
}
