export const adminUserConfig = {
  addUser: {
    initialValues: {
      role: '',
      name: '',
      username: '',
      mail: '',
      instrument: 'ninguno',
      password: ''
    },
    
    fields: [
      {
        id: 'admin-manage-user-role',
        name: 'role',
        label: 'Rol del usuario',
        type: 'select',
        required: true,
        options: [
          { value: 'role1', label: 'Usuario' },
          { value: 'role2', label: 'Admin' }
        ],
        autoComplete: 'off'
      },
      {
        id: 'admin-add-user-name',
        name: 'name',
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
        validate: v => !v ? 'Este campo es obligatorio' : v.length < 4 ? 'Mínimo 4 caracteres' : v.length > 20 ? 'Máximo 20 caracteres' : '',
        autoComplete: 'on'
      },      
      {
        id: 'admin-add-user-mail',
        name: 'mail',
        label: 'Correo electrónico',
        type: 'email',
        required: true,
        placeholder: 'ejemplo@correo.com',
        hint: 'Ingresa un correo válido',
        validate: v =>
          !v ? 'Este campo es obligatorio' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo inválido' : '',
        autoComplete: 'on'
      },
      {
        id: 'admin-add-user-instrument',
        name: 'instrument',
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
    
    onSubmit: (data, { showToast }) => {
      showToast('Registro exitoso', 'success')
    }
  },
  
  manageUser: {
    initialValues: {
      select_user: 'select',
      role: '',
      name: '',
      username: '',
      mail: '',
      instrument: 'ninguno',
      password: '',
    },
    
    fields: [
      {
        id: 'admin-manage-user-select',
        name: 'select_user',
        label: 'Usuario a editar',
        type: 'select',
        required: true,
        options: [
          { value: 'select', label: 'Selecciona un usuario'},
          { value: 'user1', label: 'Cande' },
          { value: 'user2', label: 'Iazmin' },
          { value: 'user3', label: 'Memo' }
        ],
        autoComplete: 'off'
      },
      {
        id: 'admin-manage-user-role',
        name: 'role',
        label: 'Rol del usuario',
        type: 'select',
        required: false,
        options: [
          { value: 'role1', label: 'Usuario' },
          { value: 'role2', label: 'Admin' }
        ],
        autoComplete: 'off'
      },
      {
        id: 'admin-manage-user-name',
        name: 'name',
        label: 'Nombre completo',
        type: 'text',
        required: false,
        placeholder: 'Ej: Juan Pérez',
        hint: 'Mínimo 3 caracteres, máximo 100',
        validate: v => !v ? '' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 100 ? 'Máximo 100 caracteres' : '',
        autoComplete: 'off'
      },
      {
        id: 'admin-add-user-username',
        name: 'username',
        label: 'Nombre de usuario',
        type: 'text',
        required: false,
        placeholder: 'Ej: juanperez',
        hint: 'Mínimo 4 caracteres, máximo 20',
        validate: v => !v ? 'Este campo es obligatorio' : v.length < 4 ? 'Mínimo 4 caracteres' : v.length > 20 ? 'Máximo 20 caracteres' : '',
        autoComplete: 'on'
      },
      
      {
        id: 'admin-manage-user-mail',
        name: 'mail',
        label: 'Correo electrónico',
        type: 'email',
        required: false,
        placeholder: 'ejemplo@correo.com',
        hint: 'Ingresa un correo válido',
        validate: v =>
          !v ? '' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo inválido' : '',
        autoComplete: 'off'
      },
      
      {
        id: 'admin-manage-user-instrument',
        name: 'instrument',
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
        className: 'bg-[#dc3545]',
        onClick: (data, ctx) => {
          ctx.showToast('Usuario eliminado', 'warning')
        }
      }
    ],
    
    onSubmit: (data, { showToast }) => {
      showToast('Guardado exitoso', 'success')
    }
  }
}
