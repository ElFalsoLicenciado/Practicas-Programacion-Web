import React, { use, useState } from 'react'

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        new_name: '',
        new_mail: '',
        old_password: '',
        new_password: '',
        confirm_new_password: '',
        new_instrument: ''
    })
    
    const [errors, setErrors] =useState({})
    const [notification, setNotification] = useState(null)
    
    const fields = [
        {   
            id: 'new_name', label: 'Cambiar nombre', type: 'text', required: 'no',
            placeholder: 'Ej: Juan Pérez', hint: 'Mínimo 3 caracteres, máximo 100' 
        },
        {
            id: 'new_mail', label: 'Cambiar correo', type: 'text', required: 'no',
            placeholder: 'ejemplo@correo.com', hint: 'Ingresa un correo valido'
        },
        {
            id: 'old_password', label: 'Contraseña actual', type: 'password', required: 'no',
            placeholder: '••••••••', hint: 'Contraseña que usas actualmente'
        },
        {
            id: 'new_password', label: 'Nueva contraseña', type: 'password', required: 'no',
            placeholder: '••••••••', hint: 'Mínimo 6 caracteres'
        },
        { 
            id: 'confirm_new_password', label: 'Confirmar contraseña', type: 'password', required: 'no',
            placeholder: '••••••••', hint: 'Debe coincidir con la contraseña' 
        },
        {
            id: 'new_instrument', label: 'Rol en banda de guerra', type: 'select', required: 'no',
            options: [
                { value: 'caja', label: 'Caja (Tambor)' },
                { value: 'corneta', label: 'Corneta' },
                { value: 'comandante', label: 'Comandante' },
                { value: 'ninguno', label: 'Aún no decido' }
            ]
        }
    ]
    
    
    const validateField = (id, valor, allData = formData) => {
        switch(id) {
            case 'new_name':
                if (valor && valor.length < 3) return 'Mínimo 3 caracteres'
                if (valor && valor.length > 100) return 'Máximo 100 caracteres'
            return ''
            case 'new_mail':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (valor && !emailPattern.test(valor)) return 'Ingresa un correo válido'
                return ''
            case 'old_password':
                if (!valor){
                    console.log('No hay contraseña');
                    console.log(allData.new_password.length);
                    console.log(allData.confirm_new_password.length);
                    if (allData.new_password.length > 0  && allData.confirm_new_password.length > 0) return 'Ingrese su contraseña actual para cambiarla'
                }
                return ''
            case 'new_password':
                if (valor && valor.length < 6) return 'Mínimo 6 caracteres'
                return ''
            case 'confirm_password':
                console.log(allData.new_password);
                console.log(allData.confirm_new_password);
                
                
                if (!valor && allData.new_password) return 'Confirma tu contraseña'
                if (valor !== allData.new_password) return 'Las contraseñas no coinciden'
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
        
        const error = validateField(id, value)
        setErrors(prev => ({ ...prev, [id]: error }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newErrors = {}
        let isValid = true
        

        fields.forEach(field => {
            const error = validateField(field.id, formData[field.id], formData)
            if (error) {
                newErrors[field.id] = error
                isValid = false
            }
        })

        if (!isValid) {
        setErrors(newErrors)
        showNotification('Por favor, corrige los errores en el formulario', 'error')
        return
        }
    }
    
    const cleanForm = () => {
        setFormData({
            new_name: '',
            new_mail: '',
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            new_instrument: ''
        })
        setErrors({})
    }
    
    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
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
        <div id='profile-form-container'>
            <form id='profile-form' onSubmit={handleSubmit}>
                {fields.map(field => (
                    <div key={field.id} className='form-field'>
                    <label htmlFor={field.id} className='form-label'>
                    {field.label}
                    </label>
                    {renderField(field)}

                    {field.hint && !errors[field.id] && (
                        <div className='field-hint'>{field.hint}</div>
                    )}
                    
                    {errors[field.id] && (
                        <div className='field-error'>{errors[field.id]}</div>
                    )}
                    </div>
                ))}
                <div className="form-actions single-btn">
                    <button type="submit" className="signin-btn">Guardar datos</button>
                </div>
            </form>
            {notification && (
            <div className={`toast ${notification.type}`}>
                <span className="toast-icon">
                    {notification.type === 'success' && '✓'}
                    {notification.type === 'error' && '✗'}
                    {notification.type === 'warning' && '⚠'}
                </span>
                <span className="toast-message">{notification.message}</span>
            </div>
            )}
        </div>
    )
}
export default ProfileForm