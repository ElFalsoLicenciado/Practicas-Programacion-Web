export function LoginFields({ formData, setFormData, errors }) {
  return (
    <>
      <div className="form-field">
        <label>Usuario o correo</label>
        <input
          type="text"
          value={formData.credential}
          onChange={(e) =>
            setFormData({ ...formData, credential: e.target.value })
          }
        />
        {errors.credential && <p>{errors.credential}</p>}
      </div>

      <div className="form-field">
        <label>Contraseña</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit">Iniciar sesión</button>
    </>
  )
}