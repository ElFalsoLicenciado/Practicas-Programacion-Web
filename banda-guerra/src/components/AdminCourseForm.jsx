import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminForm.css'

const AdminCourseForm = ({ onCursoAgregado, onResetCursos }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    desc: '',
    precio: '',
    img: ''
  })
  const [errors, setErrors] = useState({})
  const [notificacion, setNotificacion] = useState(null)

  const campos = [
    { id: 'nombre', label: 'Nombre del curso', type: 'text', required: true, 
      placeholder: 'Introduzca aquí el nombre', hint: 'Mínimo 3 caracteres, máximo 50' },
    { id: 'desc', label: 'Descripción del curso', type: 'textarea', required: true,
      placeholder: 'Introduzca aquí la descripción', hint: 'Mínimo 10 caracteres, máximo 200', rows: 4 },
    { id: 'precio', label: 'Cuota de inscripción', type: 'number', required: true,
      placeholder: 'Introduzca aquí el precio', hint: 'Debe ser un número mayor a 0', min: 0, step: 10 },
    { id: 'img', label: 'Imagen', type: 'url', required: false,
      placeholder: 'Ej: URL de una imagen', hint: 'URL válida de la imagen (opcional)' }
  ]

  const validarCampo = (id, valor) => {
    switch(id) {
      case 'nombre':
        if (!valor) return 'Por favor, llene este campo'
        if (valor.length < 3) return 'Mínimo 3 caracteres'
        if (valor.length > 50) return 'Máximo 50 caracteres'
        return ''
      case 'desc':
        if (!valor) return 'Por favor, llene este campo'
        if (valor.length < 10) return 'Mínimo 10 caracteres'
        if (valor.length > 200) return 'Máximo 200 caracteres'
        return ''
      case 'precio':
        if (!valor) return 'Por favor, llene este campo'
        const precio = parseFloat(valor)
        if (isNaN(precio) || precio <= 0) return 'El precio debe ser mayor a 0'
        return ''
      case 'img':
        if (valor.length === 0) return ''
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        if (!urlPattern.test(valor) && !valor.startsWith('assets/')) {
          return 'URL no válida'
        }
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
    
    const error = validarCampo(id, value)
    setErrors(prev => ({ ...prev, [id]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
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
      mostrarNotificacion('Por favor, corrige los errores en el formulario', 'error')
      return
    }
    
    const cursosGuardados = localStorage.getItem('cursos')
    let cursos = []
    if (cursosGuardados) {
      cursos = JSON.parse(cursosGuardados)
    }
    
    const nuevoId = cursos.length > 0 ? cursos[cursos.length - 1].id + 1 : 1
    
    const nuevoCurso = {
      id: nuevoId,
      nombre: formData.nombre.trim(),
      desc: formData.desc.trim(),
      precio: parseFloat(formData.precio),
      img: formData.img.trim() || 'https://s1.qwant.com/thumbr/360x360/1/c/d4ecef416ba8cfce80edb48cdbe35dc11a418b10d491711fb5abbab8a2a435/OIP.xHdaHgTa6eKSfIYygp4_PQAAAA.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%2Fid%2FOIP.xHdaHgTa6eKSfIYygp4_PQAAAA%3Fpid%3DApi&q=0&b=1&p=0&a=0'
    }
    
    const existeCurso = cursos.some(s => 
      s.nombre.toLowerCase() === nuevoCurso.nombre.toLowerCase()
    )
    
    if (existeCurso) {
      mostrarNotificacion('Ya existe un curso con ese nombre', 'warning')
      return
    }
    
    const resultado = onCursoAgregado(nuevoCurso)
    
    if (resultado !== false) {
      limpiarFormulario()
      mostrarNotificacion('Curso agregado correctamente', 'success')
    }
  }

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      desc: '',
      precio: '',
      img: ''
    })
    setErrors({})
  }

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas restaurar todos los cursos a los valores originales? Esta acción no se puede deshacer.')) {
      onResetCursos()
      mostrarNotificacion('Cursos restaurados a los valores originales', 'success')
      limpiarFormulario()
    }
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  return (
    <div id="admin-container" className='form-container'>
      <form id="admin-form" className='form' onSubmit={handleSubmit}>
        <div>
           <h2 className='form-title'>Añadir un curso</h2>
        </div>
        {campos.map(campo => (
          <div key={campo.id} className="form-field">
            <label htmlFor={campo.id} className="form-label">
              {campo.label}
              {campo.required && <span className="required-star"> *</span>}
            </label>
            
            {campo.type === 'textarea' ? (
              <textarea
                id={campo.id}
                name={campo.id}
                value={formData[campo.id]}
                onChange={handleChange}
                placeholder={campo.placeholder}
                className={errors[campo.id] ? 'error' : ''}
                rows={campo.rows || 4}
              />
            ) : (
              <input
                type={campo.type}
                id={campo.id}
                name={campo.id}
                value={formData[campo.id]}
                onChange={handleChange}
                placeholder={campo.placeholder}
                className={errors[campo.id] ? 'error' : ''}
                min={campo.min}
                step={campo.step}
              />
            )}
            
            {campo.hint && !errors[campo.id] && (
              <div className="field-hint">{campo.hint}</div>
            )}
            
            {errors[campo.id] && (
              <div className="field-error">{errors[campo.id]}</div>
            )}
          </div>
        ))}
        
        <div className="form-actions">
          <button type="submit">Agregar curso</button>
          <button type="button" onClick={limpiarFormulario}>Limpiar</button>
          <button type="button" onClick={handleReset} className="reset-btn">Reset cursos</button>
          <button type="button" onClick={() => navigate('/')}>Cancelar</button>
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

export default AdminCourseForm