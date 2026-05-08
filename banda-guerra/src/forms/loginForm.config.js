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
      
      if (!response.ok) {
        throw new Error();
      }
      
      const result = await response.json();

      if (result.success) {
        
        login({
          id: result.id,
          username: result.username,
          role: result.role
        });
        
        showToast(
          'Inicio de sesión correcto',
          'success'
        );

        setTimeout(() => {
          window.location.href = '/';
        }, 500);
        
      } else {
        
        showToast(
          'Credenciales incorrectas',
          'error'
        );
      }
      
    } catch (err) {
      
      console.error(err);
      
      showToast(
        'Error del servidor',
        'error'
      );
    }
  }
})