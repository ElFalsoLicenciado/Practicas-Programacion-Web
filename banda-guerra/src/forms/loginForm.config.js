export const loginConfig = {
  initialValues: {
    credential: '',
    password: ''
  },
  fields: [
    {
      id: 'log-in-credential',
      name: 'credential',
      label: 'Usuario o correo',
      type: 'text',
      placeholder: 'Ingresa tu usuario o correo',
      validate: (value) => {
        if (!value) return 'Campo requerido'
        return ''
      },
      autoComplete: 'on'
    },
    {
      id: 'log-in-password',
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••',
      validate: (value) => {
        if (!value) return 'Campo requerido'
        return ''
      },
      autoComplete: 'off'
    }
  ],
  actions: [{
    type: 'submit',
    label: 'Iniciar sesión',
    className: ''
  }],
  onSubmit: (data, { showToast }) => {
    showToast('Login exitoso', 'success')
    setTimeout(() => window.location.href = '/', 1500)
  }
}