import React from 'react'
import './FormField.css'

const FormField = ({
  id,
  nombre,
  hint,
  type = 'text',
  required = false,
  placeholder = '',
  disabled = false,
  value = '',
  onChange,
  onBlur,
  error,
  rows = 4,
  min,
  max,
  step,
  pattern,
  accept,
  options = [],
  className = ''
}) => {
  
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={nombre}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={error ? 'error' : ''}
            required={required}
          />
        )
      
      case 'select':
        return (
          <select
            id={id}
            name={nombre}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={error ? 'error' : ''}
            required={required}
          >
            <option value="">Selecciona una opción</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )
      
      case 'radio':
        return (
          <div className="radio-group">
            {options.map(opt => (
              <label key={opt.value} className="radio-label">
                <input
                  type="radio"
                  name={nombre}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={disabled}
                  required={required}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )
      
      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={nombre}
              checked={value}
              onChange={onChange}
              disabled={disabled}
              className={error ? 'error' : ''}
            />
            {placeholder}
          </label>
        )
      
      case 'file':
        return (
          <input
            type="file"
            id={id}
            name={nombre}
            onChange={onChange}
            disabled={disabled}
            accept={accept}
            className={error ? 'error' : ''}
            required={required}
          />
        )
      
      case 'color':
        return (
          <input
            type="color"
            id={id}
            name={nombre}
            value={value || '#000000'}
            onChange={onChange}
            disabled={disabled}
            className={`color-input ${error ? 'error' : ''}`}
            required={required}
          />
        )
      
      case 'range':
        return (
          <div className="range-wrapper">
            <input
              type="range"
              id={id}
              name={nombre}
              value={value}
              onChange={onChange}
              disabled={disabled}
              min={min || 0}
              max={max || 100}
              step={step || 1}
              className={error ? 'error' : ''}
              required={required}
            />
            <span className="range-value">{value}</span>
          </div>
        )
      
      case 'number':
        return (
          <input
            type="number"
            id={id}
            name={nombre}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={error ? 'error' : ''}
            required={required}
          />
        )
      
      default:
        // Text, email, password, tel, url, search, date, time, etc.
        return (
          <input
            type={type}
            id={id}
            name={nombre}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            pattern={pattern}
            min={min}
            max={max}
            step={step}
            className={error ? 'error' : ''}
            required={required}
          />
        )
    }
  }

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {nombre}
        {required && <span className="required-star"> *</span>}
      </label>
      
      {renderField()}
      
      {hint && !error && (
        <div className="field-hint">{hint}</div>
      )}
      
      {error && (
        <div className="field-error">{error}</div>
      )}
    </div>
  )
}

export default FormField