import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './PopUpMenu.scss'

export function PopUpMenu({
  children,
  renderContent,
  position = 'bottom',
  gap = 4,
  noArrow = true,
  noAnimation = false,
  stretchTrigger = false,
  showOnHover = false,
  mouseInDelay = 0,
  mouseOutDelay = 0,
  onOpen = () => {},
  onClose = () => {},
}) {
  const wrapperRef = useRef(null)
  const popupRef = useRef(null)
  const mouseInTimeoutRef = useRef(null)
  const mouseOutTimeoutRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [placement, setPlacement] = useState(position)
  const [isVisible, setIsVisible] = useState(false)
  const [popupStyle, setPopupStyle] = useState({})

  function open() {
    clearTimeout(mouseOutTimeoutRef.current)
    setIsOpen(true)
    onOpen()
  }

  function close() {
    clearTimeout(mouseInTimeoutRef.current)
    setIsVisible(false)
    onClose()

    if (noAnimation) {
      setIsOpen(false)
    } else {
      setTimeout(() => setIsOpen(false), 120)
    }
  }

  useEffect(() => {
    if (!showOnHover) {
      function handleClickOutside(e) {
        if (
          popupRef.current &&
          !popupRef.current.contains(e.target) &&
          !wrapperRef.current.contains(e.target)
        ) {
          close()
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      }

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, showOnHover])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 0)
    }
  }, [isOpen])

  useEffect(() => {
  if (!isOpen || !popupRef.current || !wrapperRef.current) return

  const updatePopupPosition = () => {
    const triggerRect = wrapperRef.current.getBoundingClientRect()
    const popupRect = popupRef.current.getBoundingClientRect()

    const spaceAbove = triggerRect.top
    const spaceBelow = window.innerHeight - triggerRect.bottom

    const [rawDir, rawAlign] = position.split('-')
    const vertical = rawDir || 'bottom'
    const alignment = rawAlign || 'center'

    const shouldFlip =
      vertical === 'bottom'
        ? spaceBelow < popupRect.height + gap
        : spaceAbove < popupRect.height + gap

    const newVertical = shouldFlip
      ? vertical === 'bottom' ? 'top' : 'bottom'
      : vertical

    const newPlacement = `${newVertical}${alignment !== 'center' ? `-${alignment}` : ''}`
    setPlacement(newPlacement)

    const style = calculatePopupPosition(triggerRect, popupRect, newPlacement, gap)
    setPopupStyle(style)
  }

  const scrollHandler = (e) => {
    // Prevent re-positioning when scrolling inside popup or trigger
    if (
      popupRef.current?.contains(e.target) ||
      wrapperRef.current?.contains(e.target)
    ) return
    updatePopupPosition()
  }

  updatePopupPosition()

  window.addEventListener('scroll', scrollHandler, true)
  window.addEventListener('resize', updatePopupPosition)

  return () => {
    window.removeEventListener('scroll', scrollHandler, true)
    window.removeEventListener('resize', updatePopupPosition)
  }
}, [isOpen, position, gap])

  function handleMouseEnter() {
    if (!showOnHover) return
    clearTimeout(mouseOutTimeoutRef.current)
    mouseInTimeoutRef.current = setTimeout(open, mouseInDelay)
  }

  function handleMouseLeave() {
    if (!showOnHover) return
    clearTimeout(mouseInTimeoutRef.current)
    mouseOutTimeoutRef.current = setTimeout(close, mouseOutDelay)
  }

  return (
    <div
      className={`popup-wrapper ${stretchTrigger ? 'stretch' : ''}`}
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`popup-trigger ${stretchTrigger ? 'stretch' : ''}`}
        onClick={(e) => {
          if (showOnHover) return
          e.preventDefault()
          e.stopPropagation()
          open()
        }}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            className={`popup-container ${placement}`}
            style={{ ...popupStyle, ...getGapStyle(placement, gap), position: 'absolute', zIndex: 1000 }}
          >
            <div
              className={`popup-menu-inner ${noAnimation ? 'no-animation' : isVisible ? 'visible' : ''}`}
              data-placement={placement}
            >
              {renderContent({ onCloseModal: close })}
              {!noArrow && <div className={`popup-arrow popup-arrow-${placement}`} />}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

function calculatePopupPosition(triggerRect, popupRect, placement, gap) {

  const [dir, align = 'center'] = placement.split('-')
  let top = 0
  let left = 0

  if (dir === 'bottom') {
    top = triggerRect.bottom + gap
  } else if (dir === 'top') {
    top = triggerRect.top - popupRect.height - gap
  }

  if (align === 'start') {
    left = triggerRect.left
  } else if (align === 'end') {
    left = triggerRect.right - popupRect.width

  } else {
    // center
    left = triggerRect.left + (triggerRect.width - popupRect.width) / 2
  }

  return { top: Math.round(top), left: Math.round(left) }
}

function getGapStyle(position, gap) {
  const px = `${gap}px`
  if (position.startsWith('top')) return { marginBottom: px }
  if (position.startsWith('bottom')) return { marginTop: px }
  return {}
}
