function useClickOutside(ref, onClose) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onClose()
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [ref, onClose])
  }
  