import React from 'react';
import ProfileForm from '../components/ProfileForm';
import useUsuarios from '../hooks/useUsuarios';

const ProfilePage = () => {
    return (
        <div id='profile-page'>
            <h1 className='h1-title'>Gestiona tu perfil</h1>
            <p className='p-text'>Cambia tus datos y credenciales.</p>
            <div className='form-container'>
                <div className='form'>
                    <div>
                        <ProfileForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage