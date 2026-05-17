export const adminUserConfig = ({ users, addUser, updateUser, deleteUser, getUserById, refreshUsers, usernameExists, emailExists, currentUser }) => ({  
  addUser: {
    initialValues: {
      userRole: 'none',
      fullName: '',
      username: '',
      email: '',
      bandRole: 'ninguno',
      password: ''
    },
    
    fields: [
      {
        id: 'admin-add-user-role',
        name: 'userRole',
        label: 'Rol del usuario',
        type: 'select',
        required: true,
        options: [
          { value: 'none', label: 'Selecciona un rol'},
          { value: 'user', label: 'Usuario' },
          { value: 'admin', label: 'Admininistrador' }
        ],
        validate: v => v == 'none' ? 'Elige un rol' : '',
        autoComplete: 'off'
      },
      {
        id: 'admin-add-user-name',
        name: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        required: true,
        placeholder: 'Ej: Juan Pérez',
        hint: 'Mínimo 3 caracteres, máximo 100',
        validate: v => !v ? 'Este campo es obligatorio' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 100 ? 'Máximo 100 caracteres' : '',
        autoComplete: 'on'
      },
      {
        id: 'admin-add-user-username',
        name: 'username',
        label: 'Nombre de usuario',
        type: 'text',
        required: true,
        placeholder: 'Ej: juanperez',
        hint: 'Mínimo 4 caracteres, máximo 20',
        validate: async v => {
          
          if (!v) return 'Este campo es obligatorio';
          
          
          if (v.length < 4) return 'Mínimo 4 caracteres';
          
          
          if (v.length > 20) return 'Máximo 20 caracteres';
          
          try {
            
            const exists = await usernameExists(v);
            
            if (exists) return 'El username ya existe';
            
          } catch (err) {
            
            console.error(err);
            
            return 'No se pudo validar username';
          }
          
          return '';
        },
        autoComplete: 'on'
      },      
      {
        id: 'admin-add-user-mail',
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        required: true,
        placeholder: 'ejemplo@correo.com',
        hint: 'Ingresa un correo válido',
        validate: async v => {
          
          if (!v) return 'Este campo es obligatorio';
          
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Correo inválido';
          
          
          try {
            
            const exists = await emailExists(v);
            
            if (exists) return 'El correo ya está registrado';
            
          } catch (err) {
            
            console.error(err);
            
            return 'No se pudo validar correo';
          }
          
          return '';
        },
        autoComplete: 'on'
      },
      {
        id: 'admin-add-user-instrument',
        name: 'bandRole',
        label: 'Rol en banda de guerra',
        type: 'select',
        required: true,
        options: [
          { value: 'caja', label: 'Caja' },
          { value: 'corneta', label: 'Corneta' },
          { value: 'ninguno', label: 'Ninguno' }
        ],
        autoComplete: 'off'
      },
      {
        id: 'admin-add-user-password',
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        required: true,
        placeholder: '••••••••',
        hint: 'Mínimo 6 caracteres',
        validate: v => !v ? 'Requerido' : v.length < 6 ? 'Mínimo 6 caracteres' : '',
        autoComplete: 'off'
      }
    ],
    
    actions: [{
      type: 'submit',
      label: 'Registrar usuario',
      className: ''
    }],
    
    onSubmit: async (data, { showToast, resetForm }) => {
      
      try {
        
        await addUser(data);
        
        showToast('Usuario registrado', 'success');
        
        resetForm();
        
        await refreshUsers();
        
      } catch {
        
        showToast('Error al registrar', 'error');
      }
    }
  },
  
  manageUser: {
    initialValues: {
      select_user: 'select',
      userRole: 'none',
      fullName: '',
      username: '',
      email: '',
      bandRole: 'ninguno',
      password: '',
      originalUsername: '',
      originalEmail: '',
    },
    
    fields: [
      {
        id: 'admin-manage-user-select',
        name: 'select_user',
        label: 'Usuario a editar',
        type: 'select',
        required: true,
        
        options: [
          { value: 'select', label: 'Selecciona un usuario' },
          
          ...users
          .filter(user => user.id !== currentUser?.id)
          .map(user => ({
            value: user.id,
            label: user.username
          }))
        ],
        
        validate: v =>
          v == 'select' ? 'Elige un usuario' : '',
        
        autoComplete: 'off',
        
        onChange: async (value, ctx) => {
          
          if (value === 'select') {
            
            ctx.resetForm();
            
            return;
          }
          
          try {
            
            const user = await getUserById(value);
                        
            ctx.setValues(prev => ({
              ...prev,
              
              select_user: value,
              userRole: user.user_role,
              fullName: user.full_name,
              username: user.username,
              originalUsername: user.username,
              email: user.email,
              originalEmail: user.email,
              bandRole: user.band_role,
              password: ''
            }));
            
          } catch {
            
            ctx.showToast('Error al cargar usuario', 'error');
          }
        }
      },
      {
        id: 'admin-manage-user-role',
        name: 'userRole',
        label: 'Rol del usuario',
        type: 'select',
        required: true,
        options: [
          { value: 'none', label: 'Selecciona un rol'},
          { value: 'user', label: 'Usuario' },
          { value: 'admin', label: 'Admin' }
        ],
        validate: v => v == 'none' ? 'Elige un rol' : '',
        autoComplete: 'off'
      },
      {
        id: 'admin-manage-user-name',
        name: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        required: false,
        placeholder: 'Ej: Juan Pérez',
        hint: 'Mínimo 3 caracteres, máximo 100',
        validate: v => !v ? '' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 100 ? 'Máximo 100 caracteres' : '',
        autoComplete: 'off'
      },
      {
        id: 'admin-manage-user-username',
        name: 'username',
        label: 'Nombre de usuario',
        type: 'text',
        required: false,
        placeholder: 'Ej: juanperez',
        hint: 'Mínimo 4 caracteres, máximo 20',
        
        validate: async (v, formData) => {
          
          if (!v) return '';
          
          if (v.length < 4) return 'Mínimo 4 caracteres';
          
          if (v.length > 20) return 'Máximo 20 caracteres';
          
          if (v === formData.originalUsername) return '';
          
          try {
            
            const exists = await usernameExists(v);
            
            if (exists) return 'El username ya existe';
            
          } catch (err) {
            
            console.error(err);
            
            return 'No se pudo validar username';
          }
          
          return '';
        },
        
        autoComplete: 'on'
      },
      {
        id: 'admin-manage-user-mail',
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        required: false,
        placeholder: 'ejemplo@correo.com',
        hint: 'Ingresa un correo válido',
        
        validate: async (v, formData) => {
          
          if (!v) return '';
          
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Correo inválido';
          
          if (v === formData.originalEmail) return '';
          
          try {
            
            const exists = await emailExists(v);
            
            if (exists) return 'El correo ya está registrado';
            
          } catch (err) {
            
            console.error(err);
            
            return 'No se pudo validar correo';
          }
          
          return '';
        },
        
        autoComplete: 'off'
      },
      
      {
        id: 'admin-manage-user-instrument',
        name: 'bandRole',
        label: 'Rol en banda de guerra',
        type: 'select',
        required: false,
        options: [
          { value: 'caja', label: 'Caja' },
          { value: 'corneta', label: 'Corneta' },
          { value: 'ninguno', label: 'Ninguno' }
        ],
        autoComplete: 'off'
      },
      
      {
        id: 'admin-manage-user-password',
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        required: false,
        placeholder: '••••••••',
        hint: 'Mínimo 6 caracteres',
        validate: v => !v ? '' : v.length < 6 ? 'Mínimo 6 caracteres' : '',
        autoComplete: 'off'
      }
    ],
    
    actions: [
      {
        type: 'submit',
        label: 'Guardar',
        className: ''
      },
      {
        type: 'button',
        label: 'Eliminar',
        hidden: (data) => String(data.select_user) === String(currentUser?.id),
        className: 'bg-[#dc3545]',
        
        onClick: async (data, ctx) => {
          
          if (String(data.select_user) === String(currentUser?.id)) {
            
            ctx.showToast(
              'No puedes eliminar tu propia cuenta',
              'error'
            );
            
            return;
          }
          
          try {
            
            await deleteUser(data.select_user);
            
            await refreshUsers();
            
            ctx.showToast(
              'Usuario eliminado',
              'warning'
            );
            
            ctx.setValues({
              select_user: 'select',
              userRole: 'none',
              fullName: '',
              username: '',
              email: '',
              bandRole: 'ninguno',
              password: ''
            });
            
          } catch {
            
            ctx.showToast(
              'Error al eliminar',
              'error'
            );
          }
        }
      }
    ],
    
    onSubmit: async (data, { showToast }) => {
      
      // NO EDITARSE A SI MISMO
      if (data.select_user === currentUser?.id) {
        
        showToast(
          'No puedes editar tu propia cuenta desde administración',
          'error'
        );
        
        return;
      }
      
      try {
        
        await updateUser(
          data.select_user,
          data
        );
        
        await refreshUsers();
        
        showToast(
          'Usuario actualizado',
          'success'
        );
        
      } catch {
        
        showToast(
          'Error al actualizar',
          'error'
        );
      }
    }
  }
})  