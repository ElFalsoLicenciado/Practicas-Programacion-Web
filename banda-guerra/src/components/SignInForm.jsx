import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CredentialsForm.css'

const SignInForm = ({onLogin}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    credential: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [notificacion, setNotificacion] = useState(null)

  const campos = [
    { id: 'credential', label: 'E-mail o nombre de usuario', type: 'text', required: 'yes',
      placeholder: 'ejemplo@correo.com o juanperez', hint: 'Ingresa el correo o nombre de usuario con el que te registraste' },
    { id: 'password', label: 'Contraseña', type: 'password', required: 'yes',
      placeholder: '••••••••', hint: 'Ingresa tu contraseña' }
  ]

  const validarCampo = (id, valor) => {
    switch(id) {
      case 'credential':
        if (!valor) return 'Por favor, ingrese su correo o nombre de usuario'
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // if (!emailPattern.test(valor)) return 'Ingresa un correo válido'
        return ''
      case 'password':
        if (!valor) return 'Por favor, ingrese la contraseña'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [id]: value 
    }))
    
    const error = validarCampo(id, value)
    setErrors(prev => ({ ...prev, [id]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    let isValid = true
    
    campos.forEach(campo => {
      if (campo.required == 'yes') {
        const error = validarCampo(campo.id, formData[campo.id])
        if (error) {
          newErrors[campo.id] = error
          isValid = false
        }
      }
    })
    
    if (!isValid) {
      setErrors(newErrors)
      mostrarNotificacion('Por favor, completa todos los campos', 'error')
      return
    }
  
    const usuarioEncontrado = onLogin(formData.credential, formData.password)
        
    if (!usuarioEncontrado) {
      mostrarNotificacion('Correo o contraseña incorrectos', 'error')
      return
    }
        
    limpiarFormulario()
    mostrarNotificacion('¡Inicio de sesión exitoso!', 'success')
    
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const limpiarFormulario = () => {
    setFormData({
      credential: '',
      password: ''
    })
    setErrors({})
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  return (
    <div id='signin-container'>
      <form id="signin-form" onSubmit={handleSubmit}>
        {campos.map(campo => (
          <div key={campo.id} className="form-field">
            <label htmlFor={campo.id} className="form-label">
              {campo.label}
              {campo.required=='yes' && <span className="required-star"> *</span>}
            </label>
            
            <input
              type={campo.type}
              id={campo.id}
              name={campo.id}
              value={formData[campo.id]}
              onChange={handleChange}
              placeholder={campo.placeholder}
              className={errors[campo.id] ? 'error' : ''}
            />
            
            {campo.hint && !errors[campo.id] && (
              <div className="field-hint">{campo.hint}</div>
            )}
            
            {errors[campo.id] && (
              <div className="field-error">{errors[campo.id]}</div>
            )}
          </div>
        ))}
        
        <div className="form-actions single-btn">
          <button type="submit" className="signin-btn">Iniciar Sesión</button>
        </div>
      </form>
      
      {notificacion && (
        <div className={`toast ${notificacion.tipo}`}>
          <span className="toast-icon">
            {notificacion.tipo === 'success' && '✓'}
            {notificacion.tipo === 'error' && '✗'}
            {notificacion.tipo === 'warning' && '⚠'}
          </span>
          <span className="toast-message">{notificacion.mensaje}</span>
        </div>
      )}
    </div>
  )
}

export default SignInForm