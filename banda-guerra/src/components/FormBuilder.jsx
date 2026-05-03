import { useState } from "react";

export default function FormBuilder({ config, formContainer,  formContent, formFooter }) {

  const [formData, setFormData] = useState(config.initialValues);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newData = { ...formData, [name]: value };
    setFormData(newData);

    const field = config.fields.find(f => f.name === name);
    if (field?.validate) {
      const error = field.validate(value, newData);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = () => {
    let valid = true;
    const newErrors = {};

    config.fields.forEach(field => {
      if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) {
          newErrors[field.name] = error;
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const showToast = (mensaje, tipo) => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const reset = () => {
    setFormData(config.initialValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      showToast('Corrige los errores', 'error');
      return;
    }

    config.onSubmit(formData, { showToast, reset });
  };

  const renderField = (field) => {

    if (field.type === 'select') {
      return (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {field.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        className="w-full border p-2 rounded"
      />
    );
  };

  return (
    <div className={ formContainer || "max-w-150 mx-auto px-5"}>
      <form onSubmit={handleSubmit} noValidate className={ formContent || "max-w-175 mx-auto mt-10 mb-12.5 shadow-2xl rounded-[20px] py-7.5 px-15 border-t-5 border-[#833132] bg-white space-y-4"}>
        {config.fields.map(field => (
          <div key={field.name}>
            <label className="block mb-1 font-semibold">
              {field.label}
            </label>

            {renderField(field)}

            {errors[field.name] && (
              <p className="text-red-500 text-sm">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button className="w-full bg-[#833132] text-white py-2 rounded">
          {config.submitText}
        </button>
        {formFooter && (
        <div className="form-footer">
          <p>
            {formFooter.text}{' '}
            <a 
              href="#"
              onClick={formFooter.onClick}
              className="text-[#833132] font-semibold"
            >
              {formFooter.linkText}
            </a>
          </p>
        </div>
      )}
      </form>
      {toast && (
        <div className={`mt-4 text-center ${
          toast.tipo === 'error' ? 'text-red-500' : 'text-green-500'
        }`}>
          {toast.mensaje}
        </div>
      )}
    </div>
  );
}