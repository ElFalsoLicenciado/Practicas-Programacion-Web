import React, { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import useUsuarios from '../hooks/useUsuarios';

const ProfilePage = () => {
    const { getCurrentUser, getUserById, editUser, refreshCurrentUser, users } = useUsuarios()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleEditUser = (userData) => {
        const result = editUser(userData)
        if (result) {
            // Refrescar el usuario actual después de editar
            const updatedUser = refreshCurrentUser()
            setUser(updatedUser)
        }
        return result
    }

    const handleGetUser = (id) => {
        return getUserById(id)
    }

    useEffect(() => {
        const loadUser = () => {
            const currentUser = getCurrentUser()
            setUser(currentUser)
            setLoading(false)
        }
        loadUser()
    }, [])

    // Efecto para escuchar cambios en users y actualizar el usuario actual
    useEffect(() => {
        if (user && users.length > 0) {
            const updatedUser = users.find(u => u.id === user.id)
            if (updatedUser && JSON.stringify(updatedUser) !== JSON.stringify(user)) {
                setUser(updatedUser)
            }
        }
    }, [users])

    if (loading) {
        return (
            <div id='profile-page'>
                <h1 className='h1-title'>Gestiona tu perfil</h1>
                <p className='p-text'>Cargando tus datos...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div id='profile-page'>
                <h1 className='h1-title'>Gestiona tu perfil</h1>
                <p className='p-text'>No se encontraron datos de usuario. Por favor, inicia sesión nuevamente.</p>
            </div>
        )
    }

    return (
        <div id='profile-page'>
            <h1 className='h1-title'>Gestiona tu perfil</h1>
            <p className='p-text'>Cambia tus datos y credenciales.</p>
            <div className='form-container'>
                <div className='form'>
                    <ProfileForm
                        onEditUser={handleEditUser}
                        onGetUser={handleGetUser}
                        user={user}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage