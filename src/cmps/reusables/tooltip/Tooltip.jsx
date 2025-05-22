import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Tooltip.scss'

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
  const [coords, setCoords] = useState(null)
  const wrapperRef = useRef(null)
  const enterTimeout = useRef(null)
  const exitTimeout = useRef(null)
  const hasFocusWithin = useRef(false)

  function show() {
    if (hasFocusWithin.current) return
    clearTimeout(exitTimeout.current)
    enterTimeout.current = setTimeout(() => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect()
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        })
        setVisible(true)
      }
    }, delayIn)
  }

  function hide() {
    clearTimeout(enterTimeout.current)
    exitTimeout.current = setTimeout(() => {
      setVisible(false)
    }, delayOut)
  }

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const handleFocusIn = () => {
      hasFocusWithin.current = true
      setVisible(false)
    }

    const handleFocusOut = () => {
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
    <>
      <div
        className={`tooltip-wrapper ${additionalClass} ${stretchWraper ? 'stretched' : ''}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        ref={wrapperRef}
      >
        {children}
      </div>

      {visible && coords &&
        createPortal(
          <div
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              width: coords.width,
              height: coords.height,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <div className={`tooltip-box tooltip-${position}`}>
              <div className="tooltip-gap" style={getGapStyle(position, gap)}>
                <div className={`tooltip-inner ${visible ? 'visible' : ''} ${noAnimation ? 'no-animation' : ''}`}>
                  {title}
                  {!noArrow && <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
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
