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
      name: 'name',
      label: 'Nombre',
      type: 'text',
      validate: v => !v ? 'Requerido' : v.length < 3 ? 'Mínimo 3 caracteres' : ''
    },
    {
      name: 'username',
      label: 'Usuario',
      type: 'text',
      validate: v => !v ? 'Requerido' : v.length < 4 ? 'Mínimo 4 caracteres' : ''
    },
    {
      name: 'mail',
      label: 'Correo',
      type: 'email',
      validate: v => !v ? 'Requerido' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo inválido' : ''
    },
    {
      name: 'instrument',
      label: 'Instrumento',
      type: 'select',
      options: [
        { value: 'caja', label: 'Caja' },
        { value: 'corneta', label: 'Corneta' },
        { value: 'ninguno', label: 'Ninguno' }
      ]
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      validate: v => !v ? 'Requerido' : v.length < 6 ? 'Mínimo 6' : ''
    },
    {
      name: 'confirm_password',
      label: 'Confirmar',
      type: 'password',
      validate: (v, data) =>
        v !== data.password ? 'No coinciden' : ''
    }
  ],
  submitText: 'Registrarse',
  onSubmit: (data, { showToast }) => {
    showToast('Registro exitoso', 'success')
  }
}