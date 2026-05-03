import { useState } from "react";

export function useForm(initialState, validateFn) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newData = { ...formData, [name]: value };
    setFormData(newData);

    if (validateFn) {
      const error = validateFn(name, value, newData);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    let valid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateFn(key, formData[key], formData);
      if (error) {
        newErrors[key] = error;
        valid = false;
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
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    handleChange,
    validateAll,
    showToast,
    toast,
    reset
  };
}