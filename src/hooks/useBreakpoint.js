import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint())

  useEffect(() => {
    const handleResize = throttle(() => {
      setBreakpoint(getBreakpoint())
    }, 200) // adjust delay as needed

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

function getBreakpoint() {
  const width = window.innerWidth
  if (width < 600) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Throttle utility
function throttle(fn, delay) {
  let lastCall = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }
}



// e.g:

// const breakpoint = useBreakpoint()

// useEffect(() => {
//   if (breakpoint === 'mobile') {
//     // show mobile nav
//   } else if (breakpoint === 'tablet') {
//     // do tablet stuff
//   } else {
//     // desktop layout
//   }
// }, [breakpoint])