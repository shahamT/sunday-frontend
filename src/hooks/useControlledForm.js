import { useState } from 'react';

export function useControlledForm(defaultValues = {}, validators = {}) {
  const [dataToEdit, setDataToEdit] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  function handleChange(ev) {
    const { name, type, value, checked } = ev.target;

    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number' || type === 'range') {
      newValue = value === '' ? '' : Number(value);
    } else if (type === 'date') {
      newValue = value ? new Date(value) : '';
    } else {
      newValue = value;
    }

    setDataToEdit(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error on change
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  }

  function validateField(name) {
    const validator = validators[name];
    if (!validator) return true;

    const value = dataToEdit[name];
    const error = validator(value);

    setErrors(prev => ({
      ...prev,
      [name]: error || '',
    }));

    return !error;
  }

  function validateAll() {
    const newErrors = {};
    let isValid = true;

    for (const name in validators) {
      const value = dataToEdit[name];
      const error = validators[name](value);
      if (error) {
        isValid = false;
        newErrors[name] = error;
      }
    }

    setErrors(newErrors);
    return isValid;
  }

  function resetForm() {
    setDataToEdit(defaultValues);
    setErrors({});
  }

  return [dataToEdit, handleChange, resetForm, errors, validateField, validateAll];
}



// Example Usage:

// const DefaultFormValues = {
//     fullName: '',
//     age: 0,
//     subscribed: false,
//     birthDate: '',
// }

// const [dataToEdit, handleChange, resetForm] = useControlledForm(DefaultFormValues)

//     // Inside JSX
// < input name = "fullName" value = { dataToEdit.fullName } onChange = { handleChange } />
//   <input name="age" type="number" value={dataToEdit.age} onChange={handleChange} />
//   <input name="subscribed" type="checkbox" checked={dataToEdit.subscribed} onChange={handleChange} />
//   <input name="birthDate" type="date" value={dataToEdit.birthDate} onChange={handleChange} />
