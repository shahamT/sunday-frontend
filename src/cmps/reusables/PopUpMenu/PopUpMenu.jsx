import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom'; //added

import './PopUpMenu.scss';

export function PopUpMenu({
  children,
  renderContent,
  position = 'bottom',
  gap = 10,
  noArrow = true,
  noAnimation = false,
  stretchTrigger = false,
  showOnHover = false,
  mouseInDelay = 0,
  mouseOutDelay = 0,
  onOpen = () => { },
  onClose = () => { },
}) {
  const wrapperRef = useRef(null)
  const popupRef = useRef(null)
  const mouseInTimeoutRef = useRef(null)
  const mouseOutTimeoutRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [placement, setPlacement] = useState(position)
  const [isVisible, setIsVisible] = useState(false)

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
      setTimeout(() => setIsOpen(false), 120) // match animation duration
    }
  }

  // Handle outside click
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

  // Trigger animation after render
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 0)
    }
  }, [isOpen]);

  // Determine flip direction
  useEffect(() => {
    if (!isOpen || !popupRef.current || !wrapperRef.current) return

    const triggerRect = wrapperRef.current.getBoundingClientRect()
    const popupRect = popupRef.current.getBoundingClientRect()

    const spaceAbove = triggerRect.top
    const spaceBelow = window.innerHeight - triggerRect.bottom

    const [rawDir, rawAlign] = position.split('-')
    const vertical = rawDir || 'bottom'
    const alignment = rawAlign || 'center'

    const shouldFlip = vertical === 'bottom'
      ? spaceBelow < popupRect.height + gap
      : spaceAbove < popupRect.height + gap

    const newVertical = shouldFlip
      ? vertical === 'bottom' ? 'top' : 'bottom'
      : vertical

    setPlacement(`${newVertical}${alignment !== 'center' ? `-${alignment}` : ''}`)
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
          e.preventDefault();
          e.stopPropagation();
          open();
        }}
      >
        {children}
      </div>

      {isOpen && createPortal( //added createPortal
        <div
          ref={popupRef}
          className={`popup-container ${placement}`}
          // style={getGapStyle(placement, gap)}
          style={getPopupPosition(wrapperRef.current, popupRef.current, placement, gap)} //added instead of previous line

        >
          <div
            className={`popup-menu-inner ${noAnimation ? 'no-animation' : isVisible ? 'visible' : ''
              }`}
            data-placement={placement}

          >
            {renderContent({ onCloseModal: close })}
            {!noArrow && <div className={`popup-arrow popup-arrow-${placement}`} />}
          </div>
        </div>, //added comma
        document.body //added
      )}
    </div>
  );
}

// function getGapStyle(position, gap) {
//   const px = `${gap}px`
//   if (position.startsWith('top')) return { marginBottom: px }
//   if (position.startsWith('bottom')) return { marginTop: px }
//   return {}
// }

function getPopupPosition(triggerEl, popupEl, placement, gap) { //added instead of previous function
  if (!triggerEl || !popupEl) return { top: 0, left: 0 };

  const triggerRect = triggerEl.getBoundingClientRect();
  const style = { position: 'absolute' };

  switch (placement) {
    case 'bottom':
      style.top = `${triggerRect.bottom + gap}px`;
      style.left = `${triggerRect.left + triggerRect.width / 2 - popupEl.offsetWidth / 2}px`;
      break;
    case 'top':
      style.top = `${triggerRect.top - popupEl.offsetHeight - gap}px`;
      style.left = `${triggerRect.left + triggerRect.width / 2 - popupEl.offsetWidth / 2}px`;
      break;
    case 'bottom-start':
      style.top = `${triggerRect.bottom + gap}px`;
      style.left = `${triggerRect.left}px`;
      break;
    case 'bottom-end':
      style.top = `${triggerRect.bottom + gap}px`;
      style.left = `${triggerRect.right - popupEl.offsetWidth}px`;
      break;
    case 'top-start':
      style.top = `${triggerRect.top - popupEl.offsetHeight - gap}px`;
      style.left = `${triggerRect.left}px`;
      break;
    case 'top-end':
      style.top = `${triggerRect.top - popupEl.offsetHeight - gap}px`;
      style.left = `${triggerRect.right - popupEl.offsetWidth}px`;
      break;
  }

  return style;
}

