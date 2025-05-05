import './HamburgerIcon.scss'


export function HamburgerIcon({ isOpen, color = '#000', size = 1, onClick }) {
    
    return (
        <button
            className={`hamburger-icon hamburger--spin ${isOpen ? 'is-active' : ''}`}
            onClick={onClick}
            style={{ transform: `scale(${size})`, color }} 
            aria-label="Menu"
            aria-expanded={isOpen}
        >
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
}


//   Usage:

// const [isOpen, setIsOpen] = useToggle(false)

    // < HamburgerIcon
    //     isOpen = { isOpen }
    //     onClick = { setIsOpen }
    //     color = "var(--clr-accent-base)"
    //     size = { 1}
    // />
