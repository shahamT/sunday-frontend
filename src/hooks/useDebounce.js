import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timer) // cancel timeout on cleanup or value change
  }, [value, delay])

  return debouncedValue
}


// example

// 1. query updates instantly on every keystroke.
// 2. debouncedQuery only updates after 500ms of no changes.
// 3. You use debouncedQuery for the actual search or side effects.

// function SearchComponent() {
//     const [query, setQuery] = useState('')
//     const debouncedQuery = useDebounce(query, 500) // only updates 500ms *after* user stops typing
  
//     useEffect(() => {
//       if (!debouncedQuery) return
//       // fetch or filter using debouncedQuery
//       console.log('Search for:', debouncedQuery)
//     }, [debouncedQuery])
  
//     return (
//       <input
//         type="text"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//         placeholder="Type to search..."
//       />
//     )
//   }