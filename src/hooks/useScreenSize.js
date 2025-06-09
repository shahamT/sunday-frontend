import { useState, useEffect } from 'react'

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getScreenSize())

  useEffect(() => {
    const handleResize = throttle(() => {
      setScreenSize(getScreenSize())
    }, 200) // adjust delay as needed

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

function getScreenSize() {
  return {
    sWidth: window.innerWidth,
    sHeight: window.innerHeight,
  }
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


// e.g - 


// const { width, height } = useScreenSize()

// useEffect(() => {
//   if (width < 768) {
//     console.log('Small screen')
//   }
// }, [width])
