export const registerConfig = ({registerUser, usernameExists, emailExists, login}) => ({
  initialValues: {
    fullName: '',
    username: '',
    email: '',
    bandRole: 'ninguno',
    password: '',
    confirm_password: ''
  },
  
  fields: [
    {
      id: 'sign-in-name',
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
      id: 'sign-in-username',
      name: 'username',
      label: 'Nombre de usuario',
      type: 'text',
      required: true,
      placeholder: 'Ej: juanperez',
      hint: 'Mínimo 4 caracteres, máximo 20',
      validate: async v => {
        
        if (!v) {
          return 'Este campo es obligatorio';
        }
        
        if (v.length < 4) {
          return 'Mínimo 4 caracteres';
        }
        
        if (v.length > 20) {
          return 'Máximo 20 caracteres';
        }
        
        try {
          
          const exists = await usernameExists(v);
          
          if (exists) {
            return 'El username ya existe';
          }
          
        } catch (err) {
          
          console.error(err);
          
          return 'No se pudo validar username';
        }
        
        return '';
      },
      autoComplete: 'on'
    },
    
    {
      id: 'sign-in-mail',
      name: 'email',
      label: 'Correo electrónico',
      type: 'email',
      required: true,
      placeholder: 'ejemplo@correo.com',
      hint: 'Ingresa un correo válido',
      validate: async v => {
        
        if (!v) {
          return 'Este campo es obligatorio';
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          return 'Correo inválido';
        }
        
        // SOLO SI EL FORMATO ES VÁLIDO
        try {
          
          const exists = await emailExists(v);
          
          if (exists) {
            return 'El correo ya está registrado';
          }
          
        } catch (err) {
          
          console.error(err);
          
          return 'No se pudo validar correo';
        }
        
        return '';
      },
      autoComplete: 'on'
    },
    
    {
      id: 'sign-in-instrument',
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
      id: 'sign-in-password',
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      required: true,
      placeholder: '••••••••',
      hint: 'Mínimo 6 caracteres',
      validate: v => !v ? 'Requerido' : v.length < 6 ? 'Mínimo 6 caracteres' : '',
      autoComplete: 'off'
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
      v !== data.password ? 'No coinciden' : '',
      autoComplete: 'off'
    }
  ],
  
  actions: [{
    type: 'submit',
    label: 'Registrarse',
    className: ''
  }],
  
  onSubmit: async (data, { showToast, resetForm }) => {
    
    try {
      
      const cleanData = {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        bandRole: data.bandRole,
        password: data.password
      };
      
      const result = await registerUser(cleanData);

      await login(
        cleanData.email,
        cleanData.password
      );
      
      showToast('Registro exitoso', 'success');
      
      resetForm();

      setTimeout(() => {
          window.location.href = '/';
        }, 500);
      
    } catch (err) {
      
      console.error(err);
      
      showToast('Error al registrarse', 'error');
    }
  }
})