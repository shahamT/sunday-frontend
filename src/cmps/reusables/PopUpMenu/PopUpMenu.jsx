import { useEffect, useRef, useState } from 'react';
import './PopUpMenu.scss';
import { forwardRef, useImperativeHandle } from 'react';

export const PopUpMenu = forwardRef(function PopUpMenu({
  children,
  renderContent,
  position = 'bottom',
  gap = 10,
  noArrow = true,
  noAnimation = false,
}, ref) {
  const wrapperRef = useRef(null)
  const popupRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [placement, setPlacement] = useState(position)
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsVisible(false);

    if (noAnimation) {
      setIsOpen(false);
    } else {
      setTimeout(() => setIsOpen(false), 120); // match animation duration
    }
  }

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !wrapperRef.current.contains(e.target)
      ) {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Trigger animation after render
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 0)
    }
  }, [isOpen]);

  // Determine flip direction
  useEffect(() => {
    if (!isOpen || !popupRef.current || !wrapperRef.current) return;

    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();

    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;

    const [rawDir, rawAlign] = position.split('-')
    const vertical = rawDir || 'bottom'
    const alignment = rawAlign || 'center'

    const shouldFlip = vertical === 'bottom'
      ? spaceBelow < popupRect.height + gap
      : spaceAbove < popupRect.height + gap

    const newVertical = shouldFlip
      ? vertical === 'bottom' ? 'top' : 'bottom'
      : vertical;

    setPlacement(`${newVertical}${alignment !== 'center' ? `-${alignment}` : ''}`)
  }, [isOpen, position, gap]);

  return (
    <div className="popup-wrapper" ref={wrapperRef}>
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          open();
        }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className={`popup-container ${placement}`}
          style={getGapStyle(placement, gap)}
        >
          <div
            className={`popup-menu-inner ${noAnimation ? 'no-animation' : isVisible ? 'visible' : ''
              }`}
            data-placement={placement}

          >
            {renderContent({ onCloseModal: close })}
            {!noArrow && <div className={`popup-arrow popup-arrow-${placement}`} />}
          </div>
        </div>
      )}
    </div>
  );
}
)

function getGapStyle(position, gap) {
  const px = `${gap}px`;
  if (position.startsWith('top')) return { marginBottom: px }
  if (position.startsWith('bottom')) return { marginTop: px }
  return {};
}
