export const registerConfig = {
  initialValues: {
    name: '',
    username: '',
    mail: '',
    instrument: 'ninguno',
    password: '',
    confirm_password: ''
  },

  fields: [
    {
      id: 'sign-in-name',
      name: 'name',
      label: 'Nombre completo',
      type: 'text',
      required: true,
      placeholder: 'Ej: Juan Pérez',
      hint: 'Mínimo 3 caracteres, máximo 100',
      validate: v => !v ? 'Este campo es obligatorio' : v.length < 3 ? 'Mínimo 3 caracteres' : ''
    },

    {
      id: 'sign-in-username',
      name: 'username',
      label: 'Nombre de usuario',
      type: 'text',
      required: true,
      placeholder: 'Ej: juanperez',
      hint: 'Mínimo 4 caracteres, máximo 20',
      validate: v => !v ? 'Este campo es obligatorio' : v.length < 4 ? 'Mínimo 4 caracteres' : ''
    },

    {
      id: 'sign-in-mail',
      name: 'mail',
      label: 'Correo electrónico',
      type: 'email',
      required: true,
      placeholder: 'ejemplo@correo.com',
      hint: 'Ingresa un correo válido',
      validate: v =>
        !v ? 'Este campo es obligatorio' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo inválido' : ''
    },

    {
      id: 'sign-in-instrument',
      name: 'instrument',
      label: 'Rol en banda de guerra',
      type: 'select',
      required: true,
      options: [
        { value: 'caja', label: 'Caja' },
        { value: 'corneta', label: 'Corneta' },
        { value: 'ninguno', label: 'Ninguno' }
      ]
    },

    {
      id: 'sign-in-password',
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      required: true,
      placeholder: '••••••••',
      hint: 'Mínimo 6 caracteres',
      validate: v => !v ? 'Requerido' : v.length < 6 ? 'Mínimo 6 caracteres' : ''
    },

    {
      id: 'sign-in-confirm-password',
      name: 'confirm_password',
      label: 'Confirmar contraseña',
      type: 'password',
      required: true,
      placeholder: '••••••••',
      hint: 'Debe coincidir con la contraseña',
      validate: (v, data) =>
        !v ? 'Confirma tu contraseña' :
        v !== data.password ? 'No coinciden' : ''
    }
  ],

  submitText: 'Registrarse',

  onSubmit: (data, { showToast }) => {
    showToast('Registro exitoso', 'success')
  }
}