export const loginConfig = ({login}) => ({
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
  onSubmit: async (data, { showToast }) => {
    
    try {
      
      await login(
        data.credential,
        data.password
      );
      
      showToast(
        'Inicio de sesión correcto',
        'success'
      );
      
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      
    } catch (err) {
      
      console.error(err);
      
      showToast(
        'Credenciales incorrectas',
        'error'
      );
    }
  }
})