import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../utils/FormField';

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
            id: 'nombre', label: 'Nombre del curso', type: 'text', requiered: true,
            placeholder: 'Introduzca aquí el nombre', hint: 'Mínimo 5 caracteres, máxmimo 50'
        },
        {
            id: 'desc', label: 'Descripción del curso', type: 'text', requiered: true,
            placeholder: 'Introduzca aquí la descripción', hint: 'Mínimo 5 caracteres, máxmimo 200'
        },
        {
            id: 'precio', label: 'Cuota de inscripción', type: 'number', requiered: true,
            placeholder: 'Introduzca aquí el precio', hint: 'El precio debbe ser mayor a 0'
        },
        {
            id: 'img', label: 'Imagen', type: 'text', requiered: true,
            placeholder: 'Ej: URL de una imagen', hint: 'URL válida de la imagen (opcional)'
        }
    ]
    
    const validarCampo = (id, valor) => {
        switch(id) {
            case 'nombre':
            if (valor.length < 5) return 'El nombre debe tener al menos 5 caracteres'
            if (valor.length > 50) return 'El nombre no puede exceder los 50 caracteres'
            return ''
            case 'desc':
            if (valor.length < 5) return 'La descripción debe tener al menos 5 caracteres'
            if (valor.length > 200) return 'La descripción no puede exceder los 200 caracteres'
            return ''
            case 'precio':
            const precio = parseFloat(valor)
            if (isNaN(precio)) return 'El precio debe ser un número mayor a 0'
            if (precio <= 0) return 'El precio no puede ser un número negativo'
            return ''
            case 'img':
            if (valor.length === 0) return ''
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
            if (!urlPattern.test(valor) && !valor.startsWith('assets/')) {
                return 'Ingresa una URL válida'
            }
            return ''
            default:
            return ''
        }
    }
    
    const handleChange = (e) => {
        const { id, value} = e.target
        setFormData(prev => ({ ...prev, [id]: value}))
        
        const error = validarCampo(id, value)
        setErrors(prev => ({ ...prev, [id]: error})) 
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newErrors = {}
        let isValid = true
        
        campos.forEach(campo => {
            if(campo.requiered) {
                const error = validarCampo(campo.id, formData[campo.id])
                if(error) {
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
        <div id= 'course-form' onSubmit={handleSubmit}>
            {campos.map(campo => (
                <FormField
                    key={campo.id}
                    id={campo.id}
                    nombre={campo.label}
                    type={campo.type}
                    required={campo.requiered}
                    placeholder={campo.placeholder}
                    hint={campo.hint}
                    onChange={handleChange}
                    onBlur={handleChange}
                    error={errors[campo.id]}
                />
            ))}
        </div>
    )
    
}

export default AdminForm