import { useState, useRef, useEffect } from 'react'
import './Tooltip.scss'

/**
 * Tooltip Component
 * 
 * Props:
 * - title (string): The text to display inside the tooltip.
 * - position (string): One of 12 options: (default: "top")
 *   "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"
 * - gap (number): Distance in pixels between the element and the tooltip. (default: 8)
 * - noArrow (boolean): If true, hides the tooltip arrow. (default: false)
 * - noAnimation (boolean): If true, disables fade + grow animation. (default: false)
 */
export function Tooltip({
  children,
  title,
  position = 'top',
  gap = 10,
  noArrow = false,
  noAnimation = false,
  delayIn = 300,
  delayOut = 150,
  additionalClass = '',
    stretchWraper = false

}) {
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null) 
  const enterTimeout = useRef(null)
  const exitTimeout = useRef(null)
  const hasFocusWithin = useRef(false) 

  function show() {
    if (hasFocusWithin.current) return // prevent tooltip if a child is focused
    clearTimeout(exitTimeout.current)
    enterTimeout.current = setTimeout(() => {
      setVisible(true)
    }, delayIn)
  }

  function hide() {
    clearTimeout(enterTimeout.current)
    exitTimeout.current = setTimeout(() => {
      setVisible(false)
    }, delayOut)
  }

  // monitor focus events within children
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    function handleFocusIn() {
      hasFocusWithin.current = true
      setVisible(false)
    }

    function handleFocusOut() {
      hasFocusWithin.current = false
    }

    el.addEventListener('focusin', handleFocusIn)
    el.addEventListener('focusout', handleFocusOut)

    return () => {
      el.removeEventListener('focusin', handleFocusIn)
      el.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  return (
    <div
      className={`tooltip-wrapper ${additionalClass} ${stretchWraper ? 'stretched' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      ref={wrapperRef}
    >
      {children}
      <div className={`tooltip-box tooltip-${position}`}>
        <div className="tooltip-gap" style={getGapStyle(position, gap)}>
          <div className={`tooltip-inner ${visible ? 'visible' : ''} ${noAnimation ? 'no-animation' : ''}`}>
            {title}
            {!noArrow && <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function getGapStyle(position, gap) {
  const pxGap = `${gap}px`

  if (position.startsWith('top')) return { marginBottom: pxGap }
  if (position.startsWith('bottom')) return { marginTop: pxGap }
  if (position.startsWith('left')) return { marginRight: pxGap }
  if (position.startsWith('right')) return { marginLeft: pxGap }
  return {}
}


