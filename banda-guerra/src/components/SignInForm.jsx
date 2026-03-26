import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CredentialsForm.css'

const SignInForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [notificacion, setNotificacion] = useState(null)

  const campos = [
    { id: 'correo', label: 'Correo Electrónico', type: 'email', required: true,
      placeholder: 'ejemplo@correo.com', hint: 'Ingresa el correo con el que te registraste' },
    { id: 'password', label: 'Contraseña', type: 'password', required: true,
      placeholder: '••••••••', hint: 'Ingresa tu contraseña' }
  ]

  const validarCampo = (id, valor) => {
    switch(id) {
      case 'correo':
        if (!valor) return 'El correo es requerido'
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(valor)) return 'Ingresa un correo válido'
        return ''
      case 'password':
        if (!valor) return 'La contraseña es requerida'
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
    
    // Validar campos
    const newErrors = {}
    let isValid = true
    
    campos.forEach(campo => {
      if (campo.required) {
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
    
    // Buscar usuario en localStorage
    const usuariosGuardados = localStorage.getItem('usuarios')
    let usuarios = []
    if (usuariosGuardados) {
      usuarios = JSON.parse(usuariosGuardados)
    }
    
    const usuarioEncontrado = usuarios.find(u => 
      u.correo.toLowerCase() === formData.correo.toLowerCase() &&
      u.password === formData.password
    )
    
    if (!usuarioEncontrado) {
      mostrarNotificacion('Correo o contraseña incorrectos', 'error')
      return
    }
    
    // Guardar sesión del usuario actual
    localStorage.setItem('usuarioActual', JSON.stringify({
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
      instrumento: usuarioEncontrado.instrumento
    }))
    
    limpiarFormulario()
    mostrarNotificacion('¡Inicio de sesión exitoso!', 'success')
    
    // Redirigir después de 1.5 segundos
    setTimeout(() => {
      navigate('/dashboard') // Cambia a la ruta que corresponda
    }, 1500)
  }

  const limpiarFormulario = () => {
    setFormData({
      correo: '',
      password: ''
    })
    setErrors({})
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  return (
    <>
      <form id="signin-form" onSubmit={handleSubmit}>
        {campos.map(campo => (
          <div key={campo.id} className="form-field">
            <label htmlFor={campo.id} className="form-label">
              {campo.label}
              {campo.required && <span className="required-star"> *</span>}
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
        
        <div className="form-actions">
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
    </>
  )
}

export default SignInForm