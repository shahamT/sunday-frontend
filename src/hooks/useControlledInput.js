import { useState } from 'react'

export function useControlledInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  function handleChange(ev) {
    const { type, value: rawValue, checked } = ev.target

    let newValue
    if (type === 'checkbox') {
      newValue = checked
    } else if (type === 'number' || type === 'range') {
      newValue = rawValue === '' ? '' : Number(rawValue)
    } else if (type === 'date') {
      newValue = rawValue ? new Date(rawValue) : ''
    } else {
      newValue = rawValue
    }

    setValue(newValue)
  }

  function reset() {
    setValue(defaultValue)
  }

  return [value, handleChange, reset]
}

// // example usage
// const [title, handleTitleChange, resetTitle] = useControlledValue('')

// // In JSX:
// <input value={title} onChange={handleTitleChange} />
