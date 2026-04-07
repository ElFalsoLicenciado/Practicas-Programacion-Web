import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CredentialsForm.css'

const SigInForm = ({onUsuarioAgregado, onCheckUsername}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    mail: '',
    instrument: 'ninguno',
    password: '',
    confirm_password: ''
  })
  const [errors, setErrors] = useState({})
  const [notificacion, setNotificacion] = useState(null)

  const campos = [
    { id: 'name', label: 'Nombre Completo', type: 'text', required: 'yes',
      placeholder: 'Ej: Juan Pérez', hint: 'Mínimo 3 caracteres, máximo 100' },
    {
      id: 'username', label: 'Nombre de usuario', type: 'text', required: 'yes',
      placeholder: 'Ej: juanperez', hint: 'Mínimo 4 caracteres, máximo 20'
    },
    { id: 'mail', label: 'Correo Electrónico', type: 'email', required: 'yes',
      placeholder: 'ejemplo@correo.com', hint: 'Ingresa un correo válido' },
    { id: 'instrument', label: 'Instrumento de interés', type: 'select', required: 'yes',
      options: [
        { value: 'caja', label: 'Caja (Tambor)' },
        { value: 'corneta', label: 'Corneta' },
        { value: 'comandante', label: 'Comandante' },
        { value: 'ninguno', label: 'Aún no decido' }
      ] },
    { id: 'password', label: 'Contraseña', type: 'password', required: 'yes',
      placeholder: '••••••••', hint: 'Mínimo 6 caracteres' },
    { id: 'confirm_password', label: 'Confirmar Contraseña', type: 'password', required: 'yes',
      placeholder: '••••••••', hint: 'Debe coincidir con la contraseña' }
  ]

  const validarCampo = (id, valor, allData = formData) => {
    switch(id) {
      case 'name':
        if (!valor) return 'Este campo es obligatorio'
        if (valor.length < 3) return 'Mínimo 3 caracteres'
        if (valor.length > 100) return 'Máximo 100 caracteres'
        return ''
      case 'username':
        if (!valor) return 'Este campo es obligatorio'
        if (valor.length < 5) return 'Mínimo 5 caracteres'
        if (valor.length > 20) return 'Máximo 20 caracteres'
        return ''
      case 'mail':
        if (!valor) return 'Este campo es obligatorio'
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(valor)) return 'Ingresa un correo válido'
        return ''
      case 'instrument':
        if (!valor) return 'Selecciona un instrumento'
        return ''
      case 'password':
        if (!valor) return 'Este campo es obligatorio'
        if (valor.length < 6) return 'Mínimo 6 caracteres'
        return ''
      case 'confirm_password':
        if (!valor) return 'Confirma tu contraseña'
        if (valor !== allData.password) return 'Las contraseñas no coinciden'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { id, value, type } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'number' ? parseFloat(value) || '' : value 
    }))
    
    if (id === 'confirm_password') {
      const error = validarCampo(id, value, { ...formData, [id]: value })
      setErrors(prev => ({ ...prev, [id]: error }))
      if (errors.password) {
        const passwordError = validarCampo('password', formData.password)
        setErrors(prev => ({ ...prev, password: passwordError }))
      }
    } else if (id === 'password') {
      const error = validarCampo(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
      if (formData.confirm_password) {
        const confirmError = validarCampo('confirm_password', formData.confirm_password, { ...formData, password: value })
        setErrors(prev => ({ ...prev, confirm_password: confirmError }))
      }
    } else {
      const error = validarCampo(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    let isValid = true
    
    campos.forEach(campo => {
      if (campo.required == 'yes') {
        const error = validarCampo(campo.id, formData[campo.id], formData)
        if (error) {
          newErrors[campo.id] = error
          isValid = false
        }
      }
    })
    
    if (!isValid) {
      setErrors(newErrors)
      mostrarNotificacion('Por favor, corrige los errores en el formulario', 'error')
      return
    }
        
    const existeUsuario = onCheckUsername(formData.username)
    

    if (existeUsuario) {
      mostrarNotificacion('Ya existe una cuenta con este correo electrónico', 'warning')
      return
    }
    
    const nuevoUsuario = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      mail: formData.mail.trim(),
      instrument: formData.instrument,
      password: formData.password, 
      regDate: new Date()
    }    
    
    const resultado = onUsuarioAgregado(nuevoUsuario)

    if(resultado !== false) {
      limpiarFormulario()
      mostrarNotificacion('Registro exitoso. ¡Bienvenido!', 'success')
    }
    
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const limpiarFormulario = () => {
    setFormData({
      name: '',
      mail: '',
      instrument: 'caja',
      password: '',
      confirm_password: ''
    })
    setErrors({})
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  const renderField = (campo) => {
    if (campo.type === 'select') {
      return (
        <select
          id={campo.id}
          name={campo.id}
          value={formData[campo.id]}
          onChange={handleChange}
          className={errors[campo.id] ? 'error' : ''}
        >
          {campo.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }
    
    return (
      <input
        type={campo.type}
        id={campo.id}
        name={campo.id}
        value={formData[campo.id]}
        onChange={handleChange}
        placeholder={campo.placeholder}
        className={errors[campo.id] ? 'error' : ''}
      />
    )
  }

  return (
    <>
        <form id="register-form" onSubmit={handleSubmit}>
          {campos.map(campo => (
            <div key={campo.id} className="form-field">
              <label htmlFor={campo.id} className="form-label">
                {campo.label}
                {campo.required && <span className="required-star"> *</span>}
              </label>
              
              {renderField(campo)}
              
              {campo.hint && !errors[campo.id] && (
                <div className="field-hint">{campo.hint}</div>
              )}
              
              {errors[campo.id] && (
                <div className="field-error">{errors[campo.id]}</div>
              )}
            </div>
          ))}
          
          <div className="form-actions single-btn">
            <button type="submit" className="register-btn">Completar Registro</button>
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

export default SigInForm