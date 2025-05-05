import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}


// example:
// const [theme, setTheme] = useLocalStorage('theme', 'light')
