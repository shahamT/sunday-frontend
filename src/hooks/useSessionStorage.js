import { useState, useEffect } from 'react'

export function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = sessionStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// example:

// const [step, setStep] = useSessionStorage('currentStep', 1)
