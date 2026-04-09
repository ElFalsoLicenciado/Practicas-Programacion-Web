import React, { useState, useEffect } from 'react'

const ProfileForm = ({ onEditUser, onGetUser, user }) => {
    const [formData, setFormData] = useState({
        new_name: '',
        new_mail: '',
        old_password: '',
        new_password: '',
        confirm_new_password: '',
        new_instrument: ''
    })

    const [currentUser, setCurrentUser] = useState(null)
    const [cur_pass, setCur_Pass] = useState(null)
    const [cur_mail, setCur_Mail] = useState(null)
    const [errors, setErrors] = useState({})
    const [notification, setNotification] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Cargar datos del usuario al montar el componente y cuando user cambie
    useEffect(() => {
        if (user && user.id) {
            loadUserData()
        }
    }, [user])

    const loadUserData = async () => {
        try {
            setIsLoading(true)
            // Obtener datos actualizados del usuario
            const updatedUser = onGetUser(user.id)
            
            if (updatedUser) {
                setCurrentUser(updatedUser)
                setCur_Mail(updatedUser.mail)
                setCur_Pass(updatedUser.password)
                setFormData(prev => ({
                    ...prev,
                    new_instrument: updatedUser.instrument || 'ninguno',
                    new_name: '',
                    new_mail: '',
                    old_password: '',
                    new_password: '',
                    confirm_new_password: ''
                }))
            }
        } catch (error) {
            console.error('Error al cargar usuario:', error)
            showNotification('Error al cargar los datos del usuario', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // Función para recargar el usuario después de guardar cambios
    const reloadUser = async () => {
        if (user && user.id) {
            const updatedUser = onGetUser(user.id)
            if (updatedUser) {
                setCurrentUser(updatedUser)
                setCur_Mail(updatedUser.mail)
                setCur_Pass(updatedUser.password)
            }
        }
    }

    const fields = [
        {   
            id: 'new_name', label: 'Cambiar nombre', type: 'text', required: false,
            placeholder: 'Ej: Juan Pérez', hint: 'Mínimo 3 caracteres, máximo 100' 
        },
        {
            id: 'new_mail', label: 'Cambiar correo', type: 'email', required: false,
            placeholder: 'ejemplo@correo.com', hint: 'Ingresa un correo valido'
        },
        {
            id: 'old_password', label: 'Contraseña actual', type: 'password', required: false,
            placeholder: '••••••••', hint: 'Contraseña que usas actualmente'
        },
        {
            id: 'new_password', label: 'Nueva contraseña', type: 'password', required: false,
            placeholder: '••••••••', hint: 'Mínimo 6 caracteres'
        },
        { 
            id: 'confirm_new_password', label: 'Confirmar contraseña', type: 'password', required: false,
            placeholder: '••••••••', hint: 'Debe coincidir con la contraseña' 
        },
        {
            id: 'new_instrument', label: 'Instrumento de interés', type: 'select', required: false,
            options: [
                { value: 'caja', label: 'Caja (Tambor)' },
                { value: 'corneta', label: 'Corneta' },
                { value: 'comandante', label: 'Comandante' },
                { value: 'ninguno', label: 'Aún no decido' }
            ]
        }
    ]
    
    const isPasswordChangeAttempt = () => {
        const { new_password, confirm_new_password } = formData
        return new_password !== '' || confirm_new_password !== ''
    }
    
    const validateField = (id, valor, allData = formData) => {
        switch(id) {
            case 'new_name':
                if (valor && valor.length < 3) return 'Mínimo 3 caracteres'
                if (valor && valor.length > 100) return 'Máximo 100 caracteres'
                return ''
                
            case 'new_mail':
                if (valor) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailPattern.test(valor)) return 'Ingresa un correo válido'
                    // Verificar si el nuevo correo ya existe (opcional)
                    if (currentUser && valor === currentUser.mail) {
                        return 'El correo es el mismo que el actual'
                    }
                }
                return ''
                
            case 'old_password':
                if (isPasswordChangeAttempt()) {
                    if (!valor) return 'Ingrese su contraseña actual para cambiarla'
                    if (cur_pass && valor !== cur_pass) return 'La contraseña actual es incorrecta'
                }
                return ''
                
            case 'new_password':
                if (valor) {
                    if (valor.length < 6) return 'Mínimo 6 caracteres'
                    // Verificar que la nueva contraseña sea diferente a la actual
                    if (cur_pass && valor === cur_pass) {
                        return 'La nueva contraseña debe ser diferente a la actual'
                    }
                }
                return ''
                
            case 'confirm_new_password':
                if (allData.new_password && !valor) {
                    return 'Confirma tu nueva contraseña'
                }
                if (valor && valor !== allData.new_password) {
                    return 'Las contraseñas no coinciden'
                }
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
        
        const error = validateField(id, value, { ...formData, [id]: value })
        setErrors(prev => ({ ...prev, [id]: error }))
        
        if (id === 'new_password') {
            const confirmError = validateField('confirm_new_password', formData.confirm_new_password, { 
                ...formData, 
                new_password: value 
            })
            setErrors(prev => ({ ...prev, confirm_new_password: confirmError }))
            
            if (value || formData.confirm_new_password) {
                const oldPasswordError = validateField('old_password', formData.old_password, {
                    ...formData,
                    new_password: value
                })
                setErrors(prev => ({ ...prev, old_password: oldPasswordError }))
            }
        }
        
        if (id === 'confirm_new_password') {
            const error = validateField(id, value, formData)
            setErrors(prev => ({ ...prev, [id]: error }))
            
            if (formData.new_password || value) {
                const oldPasswordError = validateField('old_password', formData.old_password, formData)
                setErrors(prev => ({ ...prev, old_password: oldPasswordError }))
            }
        }
        
        if (id === 'old_password' && isPasswordChangeAttempt()) {
            const error = validateField(id, value, formData)
            setErrors(prev => ({ ...prev, [id]: error }))
        }
    }
    
    const validateForm = () => {
        const newErrors = {}
        let isValid = true
        
        if (formData.new_name) {
            const error = validateField('new_name', formData.new_name)
            if (error) {
                newErrors.new_name = error
                isValid = false
            }
        }
        
        if (formData.new_mail) {
            const error = validateField('new_mail', formData.new_mail)
            if (error) {
                newErrors.new_mail = error
                isValid = false
            }
        }
        
        if (isPasswordChangeAttempt()) {
            const oldPasswordError = validateField('old_password', formData.old_password, formData)
            if (oldPasswordError) {
                newErrors.old_password = oldPasswordError
                isValid = false
            }
            
            if (formData.new_password) {
                const newPasswordError = validateField('new_password', formData.new_password)
                if (newPasswordError) {
                    newErrors.new_password = newPasswordError
                    isValid = false
                }
            }
            
            const confirmError = validateField('confirm_new_password', formData.confirm_new_password, formData)
            if (confirmError) {
                newErrors.confirm_new_password = confirmError
                isValid = false
            }
        }
        
        setErrors(newErrors)
        return isValid
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            showNotification('Por favor, corrige los errores en el formulario', 'error')
            return
        }
        
        const hasChanges = formData.new_name || 
                          formData.new_mail || 
                          (formData.new_instrument !== currentUser?.instrument) || 
                          isPasswordChangeAttempt()
        
        if (!hasChanges) {
            showNotification('No hay cambios para guardar', 'warning')
            return
        }
        
        // Preparar datos a actualizar
        const updatedData = {
            id: user.id
        }
        
        if (formData.new_name) {
            updatedData.name = formData.new_name
        }
        
        if (formData.new_mail) {
            updatedData.mail = formData.new_mail
        }
        
        if (formData.new_instrument !== currentUser?.instrument) {
            updatedData.instrument = formData.new_instrument
        }
        
        if (isPasswordChangeAttempt() && formData.new_password) {
            updatedData.password = formData.new_password
        }
        
        const result = onEditUser(updatedData)
        
        if (result !== false) {
            await reloadUser()
            
            showNotification('Perfil actualizado correctamente', 'success')
            cleanForm()
        } else {
            showNotification('Error','error')
        }
    }
    
    const cleanForm = () => {
        setFormData({
            new_name: '',
            new_mail: '',
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            new_instrument: currentUser?.instrument || 'ninguno'
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
    
    if (isLoading) {
        return (
            <div id='profile-form-container'>
                <div className="loading-message">
                    Cargando datos del usuario...
                </div>
            </div>
        )
    }
    
    if (!currentUser) {
        return (
            <div id='profile-form-container'>
                <div className="error-message">
                    No se pudieron cargar los datos del usuario
                </div>
            </div>
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
                <div className="form-actions two-btns">
                    <button type="submit" className="signin-btn">Guardar datos</button>
                    <button type="button" className="btn-cancel" onClick={cleanForm}>Limpiar</button>
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