import './Loader.scss'

export function Loader({
  size = 1,
  width = 3,
  speed = 0.8,
  color = '#fff',
  type = 'inline',
  text = '',
  textSize = 1,
  textPad = 1,
  textPos = 'bottom'
}) {
  const spinnerColor = color
  const ringColor = withAlpha(color, 0.2)
  const backdropColor = withAlpha(color, 0.1)

  const isVertical = textPos === 'top' || textPos === 'bottom'
  const isCover = type === 'cover'

  const wrapperStyle = {
    display: 'inline-block',
    position: isCover ? 'absolute' : 'relative',
    inset: isCover ? 0 : 'unset',
    width: isCover ? '100%' : 'auto',
    height: isCover ? '100%' : 'auto',
  }

  const backdropStyle = isCover ? {
    position: 'absolute',
    inset: 0,
    backgroundColor: backdropColor,
    zIndex: 0,
  } : {}

  const centerContentStyle = {
    position: isCover ? 'absolute' : 'relative',
    top: isCover ? '50%' : 'unset',
    left: isCover ? '50%' : 'unset',
    transform: isCover ? 'translate(-50%, -50%)' : 'none',
    display: isVertical ? 'flex' : 'inline-flex',
    flexDirection: getFlexDirection(textPos),
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${textPad}em`,
    zIndex: isCover ? 1 : 'auto',
  }

  const spinnerStyle = {
    width: `${size}em`,
    height: `${size}em`,
    border: `${width}px solid ${ringColor}`,
    borderTop: `${width}px solid ${spinnerColor}`,
    borderRadius: '50%',
    animation: `spin ${speed}s linear infinite`,
    boxSizing: 'border-box',
  }

  const textStyle = {
    fontSize: `${textSize}em`,
    color,
  }

  return (
    <div style={wrapperStyle}>
      {isCover && <div style={backdropStyle}></div>}
      <div style={centerContentStyle}>
        <div style={spinnerStyle}></div>
        {text && <div style={textStyle}>{text}</div>}
      </div>
    </div>
  )
}

// === Helper: apply alpha to hex or rgb color ===
function withAlpha(color, alpha) {
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const bigint = parseInt(hex.length === 3 ? hex.replace(/./g, c => c + c) : hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
  }

  return color
}

function getFlexDirection(pos) {
  switch (pos) {
    case 'top': return 'column-reverse'
    case 'bottom': return 'column'
    case 'start': return 'row-reverse'
    case 'end': return 'row'
    default: return 'column'
  }
}

// usage

// ex 1
// <Loader
//   size={50}
//   width={8}
//   color="#09f"
//   text="Loading..."
//   textPos="end"
//   textSize={1.2}
// />

// ex 2
// <Loader
// type="cover"
// size={100}
// width={14}
// color="#4caf50"
// text="Crunching data..."
// textSize={1.5}
// textPad={1.5}
// textPos="top"
// />