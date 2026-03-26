import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../utils/FormField';
import './AdminForm.css'

const AdminForm = ({onCursoAgregado, onResetCursos}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        desc: '',
        precio: '',
        img: ''
    })
    
    const [errors, setErrors] = useState({})
    const [notificacion, setNotificacion] = useState(null)
    
    const campos = [
        {
            id: 'nombre-field', label: 'Nombre del curso', type: 'text', required: true,
            placeholder: 'Introduzca aquí el nombre', hint: 'Mínimo 5 caracteres, máximo 50'
        },
        {
            id: 'descripcion-field', label: 'Descripción del curso', type: 'textarea', required: true,
            placeholder: 'Introduzca aquí la descripción', hint: 'Mínimo 5 caracteres, máximo 200'
        },
        {
            id: 'precio-field', label: 'Cuota de inscripción', type: 'number', required: true,
            placeholder: 'Introduzca aquí el precio', hint: 'El precio debe ser mayor a 0'
        },
        {
            id: 'img-field', label: 'Imagen', type: 'text', required: false,
            placeholder: 'Ej: URL de una imagen', hint: 'URL válida de la imagen (opcional)'
        }
    ]
    
    const validarCampo = (id, valor) => {
        switch(id) {
            case 'nombre-field':
            if (!valor) return 'El nombre es requerido'
            if (valor.length < 3) return 'Mínimo 3 caracteres'
            if (valor.length > 50) return 'Máximo 50 caracteres'
            return ''
            case 'descripcion-field':
            if (!valor) return 'La descripción es requerida'
            if (valor.length < 10) return 'Mínimo 10 caracteres'
            if (valor.length > 200) return 'Máximo 200 caracteres'
            return ''
            case 'precio-field':
            if (!valor) return 'El precio es requerido'
            if (valor <= 0) return 'El precio debe ser mayor a 0'
            return ''
            case 'img-field':
            if (valor && !valor.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/) && !valor.startsWith('assets/')) {
                return 'URL no válida'
            }
            return ''
            default:
            return ''
        }
    }
    
    const handleChange = (e) => {
        const { id, value, type } = e.target
        setFormData(prev => ({...prev, [id]: type === 'number' ? parseFloat(value) || '' : value}))
        
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }))
        }
    }
    
    const handleBlur = (e) => {
        const { id, value } = e.target
        const error = validarCampo(id, value)
        setErrors(prev => ({ ...prev, [id]: error }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newErrors = {}
        
        campos.forEach(campo => {
            if (campo.required) {
                const error = validarCampo(campo.id, formData[campo.id])
                if (error) {
                newErrors[campo.id] = error
                }
            }
        })

        if (!validarFormulario()) {
            setErrors(newErrors)
            mostrarNotificacion('Por favor, corrige los errores en el formulario', 'error')
            return
        }
        
        const cursosGuardados = localStorage.getItem('servicios')
        let cursos = []
        if (cursosGuardados) {
            cursos = JSON.parse(cursosGuardados)
        }
        
        const ultimoCurso = cursos.at(-1)
        
        const nuevoCurso = {
            id: ultimoCurso.id + 1,
            nombre: formData.nombre.trim(),
            desc: formData.desc.trim(),
            precio: parseFloat(formData.precio),
            img: formData.img.trim() || 'https://s1.qwant.com/thumbr/360x360/1/c/d4ecef416ba8cfce80edb48cdbe35dc11a418b10d491711fb5abbab8a2a435/OIP.xHdaHgTa6eKSfIYygp4_PQAAAA.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%2Fid%2FOIP.xHdaHgTa6eKSfIYygp4_PQAAAA%3Fpid%3DApi&q=0&b=1&p=0&a=0'
        }
        
        const existeCurso = cursos.some(s =>
            s.nombre.toLowerCase() === nuevoCurso.nombre.toLocaleLowerCase()
        )
        
        if (existeCurso) {
            mostrarNotificacion('Ya existe un curso con ese nombre', 'warning')
            return
        }
        
        const resultado = onCursoAgregado(nuevoCurso)
        
        if (resultado !== false) {
            limpiarFormulario()
            mostrarNotificacion('Servicio agregado correctamente', 'success')
        }
    }
    
    const validarFormulario = () => {
        const nuevosErrores = {}
        
        campos.forEach(campo => {
            if (campo.required) {
                const valor = formData[campo.id]
                const error = validarCampo(campo.id, valor)
                if (error) nuevosErrores[campo.id] = error
            }
        })
        
        setErrors(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }
    
    const limpiarFormulario = () => {
        setFormData({
            id: 0,
            nombre: '',
            desc: '',
            precio: '',
            img: ''
        })
        setErrors({})
    }
    
    const handleReset = () => {
        if (window.confirm('¿Estas seguro de que deseas restaurar todos los cursos a los valores originales? Esta acción no se puede deshacer.')) {
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
        <div>
            <form className= 'admin-form' onSubmit={handleSubmit}>
                <div>
                    <h2 className='title-admin-form'>Añadir un curso</h2>
                </div>
                {campos.map(campo => (
                    <FormField
                    key={campo.id}
                    id={campo.id}
                    nombre={campo.label}
                    type={campo.type}
                    required={campo.required}
                    placeholder={campo.placeholder}
                    hint={campo.hint}
                    value={formData[campo.id]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors[campo.id]}
                    rows={10}
                    min={campo.min}
                    max={campo.max}
                    step={campo.step}
                    defaultValue={campo.defaultValue}
                    />
                ))}

                <div className='form-actions'>
                    <button type='submit' className='form-save-btn'>Agregar curso</button> 
                    <button type='button' onClick={limpiarFormulario}>Limpiar</button>
                    <button type='button' onClick={handleReset} className='form-reset-btn'>Reset cursos</button>
                    <button type='button' onClick={() => navigate('/')}> Cancelar</button>
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

export default AdminForm