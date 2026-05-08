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
  onSubmit: async (data, { showToast }) => {
    
    try {
      
      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      
      const result = await response.json();
      
      if (result === 1) {
        
        showToast('Inicio de sesión correcto', 'success');
        
      } else {
        
        showToast('Credenciales incorrectas', 'error');
      }
      
    } catch {
      
      showToast('Error del servidor', 'error');
    }
  }
}