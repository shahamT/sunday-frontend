import { useState } from 'react'

export function useControlledForm(defaultValues = {}) {
    const [dataToEdit, setDataToEdit] = useState(defaultValues)

    function handleChange(ev) {
        const { name, type, value, checked } = ev.target

        let newValue

        if (type === 'checkbox') {
            newValue = checked
        } else if (type === 'number' || type === 'range') {
            newValue = value === '' ? '' : Number(value)
        } else if (type === 'date') {
            newValue = value ? new Date(value) : ''
        } else {
            newValue = value
        }

        setDataToEdit(prev => ({
            ...prev,
            [name]: newValue,
        }))
    }

    function resetForm() {
        setDataToEdit(defaultValues)
    }

    return [dataToEdit, handleChange, resetForm]
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
