  import { useState, useRef, useEffect } from "react";

  export default function FormBuilder({ config, formContainer, formContent, formFooter, children }) {

    const [formData, setFormData] = useState(config.initialValues)
    const [errors, setErrors] = useState({})
    const [toast, setToast] = useState(null)  
    const timeoutRef = useRef({});
    
    useEffect(() => {
      return () => {
        Object.values(timeoutRef.current)
          .forEach(clearTimeout);
      }
    }, [])

    const handleChange = (e) => {
      const { name, value } = e.target

      const newData = { ...formData, [name]: value }
      setFormData(newData)

      const field = config.fields.find(f => f.name === name)

      if (field?.validate) {

        clearTimeout(timeoutRef.current[name]);
        timeoutRef.current[name] = setTimeout(() => {

          const currentValue = value;

          Promise
          .resolve(field.validate(value, newData))
          .then(error => {

            if(newData[name] !== currentValue) {
              return
            }

              setErrors(prev => ({
                  ...prev,
                  [name]: error
              }));
          });
        }, 400)
      }
    }

    const validateAll = async () => {

        let valid = true;

        const newErrors = {};

        for (const field of config.fields) {

            if (field.validate) {

                const error = await field.validate(
                    formData[field.name],
                    formData
                );

                if (error) {

                    newErrors[field.name] = error;

                    valid = false;
                }
            }
        }

        setErrors(newErrors);

        return valid;
    };

    const showToast = (mensaje, tipo) => {
      setToast({ mensaje, tipo })
      setTimeout(() => setToast(null), 3000)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      const cleanData = {
        ...formData
      };

      if(formData.price !== undefined) {
        cleanData.price = Number(formData.price);
      }

      if(formData.learnPoints) {
        cleanData.learnPoints =
          formData.learnPoints
            .map(i => i.trim())
            .filter(i => i !== '');
      }

      if (!(await validateAll())) {
        showToast('Corrige los errores del formulario', 'error')
        return
      }

      config.onSubmit(cleanData, {
        showToast,
  
        resetForm: () => {
          setFormData(config.initialValues);
          setErrors({});
        }
      })
    }

    const renderField = (field) => {
      const baseClass = `w-full p-3 border-2 rounded-lg font-[Poppins] text-base transition-all duration-300 ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-[#833132] focus:shadow-[0_0_0_3px_rgba(131,49,50,0.1)]`

      if (field.type === 'select') {
        return (
          <select
            id={field.id}
            name={field.name}
            value={formData[field.name]}
            onChange={(e) => {
              handleChange(e);

              field.onChange?.(e.target.value, {
                showToast,
                setValues: setFormData,
                values: formData,
                resetForm: () => {
                  setFormData(config.initialValues);
                  setErrors({});}
              });
            }}
            className={baseClass}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )
      }

      if (field.type === 'textarea') {
      return(
          <textarea
            type={field.type}
            id={field.id}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={baseClass}
            autoComplete={field.autoComplete}
            rows={field.rows || 4}
          />
        )
      }

      if (field.type === 'dynamic-list') {
        const values = formData[field.name] || [''];

        const updateItem = (index, value) => {
          const newList = [...values];
          newList[index] = value;

          setFormData(prev => ({
            ...prev,
            [field.name]: newList
          }));
        };

        const addItem = () => {
          setFormData(prev => ({
            ...prev,
            [field.name]: [...values, '']
          }));
        };

        const removeItem = (index) => {
          if (values.length === 1 ) return;
          const newList = values.filter((_, i) => i !== index);

          setFormData(prev => ({
            ...prev,
            [field.name]: newList.length ? newList : ['']
          }));
        };

      return (
        <div className="space-y-2">
          {values.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={`Punto ${index + 1}`}
                className={baseClass}
              />

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-3 bg-red-500 text-white rounded-lg"
              >
                ✕
              </button>
            </div>))}

            <button
              type="button"
              onClick={addItem}
              className="mt-2 px-4 py-2 bg-[#833132] text-white rounded-lg"
            >
              + Agregar
            </button>
          </div>
        );
      }

      return (
        <input
          type={field.type}
          id={field.id}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={baseClass}
          autoComplete={field.autoComplete}
          min={field.min}
          step={field.step}
        />
      )
    }

    return (
      <div className={formContainer || "max-w-150 mx-auto px-5"}>
        <form onSubmit={handleSubmit} noValidate className={formContent || "max-w-175 mx-auto mt-10 mb-12 shadow-[0_8px_20px_rgba(0,0,0,0.35)] rounded-[20px] py-8 px-12 border-t-[5px] border-[#833132] bg-white space-y-5"}>
          {children}
          {
            config.fields.map(field => (
              <div key={field.name} className="text-left">
                <label htmlFor={field.id} className="block mb-2 font-[Roboto] font-medium text-[#333] text-[1.1rem]">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>

                {renderField(field)}

                {/* HINT */}
                {!errors[field.name] && field.hint && (
                  <p className="text-[#666] text-sm mt-1 italic font-[Poppins]">
                    {field.hint}
                  </p>
                )}

                {/* ERROR */}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    ⚠ {errors[field.name]}
                  </p>
                )}

              </div>
          ))}

          <div className="form-actions grid gap-3 mt-6">
            {(config.actions || [
              { type: 'submit', label: config.submitText }
            ]).filter(btn => typeof btn.hidden === 'function' ? !btn.hidden(formData) : !btn.hidden)
            .map((btn, i) => (
              <button
                key={i}
                type={btn.type || 'button'}
                onClick={
                  btn.type !== 'submit'
                    ? () => btn.onClick?.(formData, {
                        showToast,

                        setValues: setFormData,

                        resetForm: () => {
                          setFormData(config.initialValues);
                          setErrors({});
                        }
                      })
                    : undefined
                }
                className={`
                  p-3 rounded-lg font-semibold text-white transition-all
                  ${btn.className || 'bg-[#833132]'}
                `}
              >
                {btn.label}
              </button>
            ))}
        </div>

          {formFooter && (
            <div className="form-footer">
              <p>
                {formFooter.text}{' '}
                <a href="#" onClick={formFooter.onClick} className="text-[#833132] font-bold">
                  {formFooter.linkText}
                </a>
              </p>
            </div>
          )}
        </form>

        {/* TOAST */}
        {toast && (
          <div className={`
            fixed top-24 right-5 bg-white rounded-lg p-4 shadow-lg
            grid grid-cols-[auto_1fr] gap-3
            animate-[slideIn_0.3s_ease]
            border-l-4 w-87.5
            ${toast.tipo === 'success' ? 'border-green-500' :
              toast.tipo === 'error' ? 'border-red-500' :
              'border-yellow-500'}
          `}>
            <span className="text-lg">
              {toast.tipo === 'success' && '✓'}
              {toast.tipo === 'error' && '✗'}
              {toast.tipo === 'warning' && '⚠'}
            </span>

            <span className="font-[Poppins] text-sm text-gray-800">
              {toast.mensaje}
            </span>
          </div>
        )}
      </div>
    )
  }