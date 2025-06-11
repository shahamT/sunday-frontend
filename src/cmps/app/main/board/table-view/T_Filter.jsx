// === Libs

// === Services
import { debounce } from "../../../../../services/base/util.service.js"

// === Actions
import { addTask } from "../../../../../store/actions/board.actions.js"
import { setFilterBy } from "../../../../../store/actions/board.actions.js"
import { store } from "../../../../../store/store.js"

// === Hooks / React
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu.jsx"
import { AddNewSelection } from "../value-setter/AddNewSelection.jsx"
import { Tooltip } from "../../../../reusables/tooltip/Tooltip.jsx"

// ====== Component ======
// =======================

export function T_Filter() {
 
    // === Consts
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const users = useSelector(storeState => storeState.userModule.users)
    const modalCloseRef = useRef(null)

    const [isInput, setIsInput] = useState(false)
    const [isExitBtn, setIsExitBtn] = useState(false)
    const [hasText, setHasText] = useState(false)
    const [value, setValue] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selectedPerson, setSelectedPerson] = useState(null)

    const location = useLocation();
    const isKanbanRoute = location.pathname.endsWith('/kanban');

    const debouncedSetFilterBy = useRef(
        debounce((val) => {
            try {
                
            setFilterBy({ ...store.getState().boardModule.filterBy, txt: val })
            } catch (err) {
            showErrorMsg('Something went wrong')
            }
        }, 300)
    )

    // === Effects
    useEffect(() => {
        return () => {
            debouncedSetFilterBy.current.cancel()
        }
    }, [])

    useEffect(() => {

    },[isInput])

    // === Functions
    function onAddTask() {
        addTask({ itemColId: 0, isTop: true})
    }

    function onSetFilterBy({ target }) {
        const val = target.value
        setValue(val)

        if (val === '') {
            setIsExitBtn(false)
            setHasText(false)
        } else {
            setIsExitBtn(true)
            setHasText(true)
        }

        debouncedSetFilterBy.current(val)

    }

    function onHandlePersonFilterBy(user) {

        setFilterBy({ ...filterBy, person: user._id })
        setSelectedPerson(user)

        setIsMenuOpen(false)
        if (modalCloseRef.current) {
            modalCloseRef.current()
        }

    }

    function onRemovePersonFilterBy (ev) {
        ev.stopPropagation()
        setIsMenuOpen(false)
        setSelectedPerson(null)
        setFilterBy(prevFilter => ({...prevFilter, person: '' }))

        if (modalCloseRef.current) {
            modalCloseRef.current()
        }
    }

    function onHandleOnBlur() {
        if (!value.trim()) {
            setIsInput(false)
            setIsExitBtn(false)
        }
    }

    return (
        <section className="T_Filter">
            {!isKanbanRoute &&
                <div className="split-button size-32 filled new-item-btn">
                    <div className="clickable btn-left filled" onClick={onAddTask}>New item</div>
                    <div className="seperator"></div>
                        <PopUpMenu
                            position="bottom-start"
                            gap={6}
                            renderContent={({ onCloseModal }) => (
                                <AddNewSelection onCloseModal={onCloseModal} />
                            )}>
                            <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
                        </PopUpMenu>

                </div>}
            {isInput 
            ? ( 
                <div className={`filter-search-bar ${hasText ? 'has-text' : ''}`}>
                    <div className="filter-input">
                        <input type="text" value={value} placeholder="Search this board" onChange={onSetFilterBy} onBlur={onHandleOnBlur} autoFocus/>
                    </div>
                        <button className="exit-btn clickable clear icon-btn size-24 i-CloseSmall" onClick={() => {
                            setValue('')
                            setIsExitBtn(false)
                            setHasText(false)
                            setFilterBy({...filterBy, txt:''})
                            setTimeout(() => {document.querySelector('.filter-input input')?.focus()}, 0)
                            }}></button>
                </div>
            )
            : (<div className="search-btn clickable clear size-32 icon-start i-Search txt-search" onClick={() => setIsInput(true)}>Search</div> )}

            <PopUpMenu
                position="bottom-start"
                onOpen={() => setIsMenuOpen(true)}
                onClose={() => setIsMenuOpen(false)}
                renderContent={({ onCloseModal }) => {
                    modalCloseRef.current = onCloseModal
                    return (
                        <section className="person-filter-popup-content">
                            <div className="title">Filter this board by person</div>
                            <div className="subtitle">And find items they're working on.</div>
                            <section className="specific-person-to-filterBy">
                                {users.map(user => {
                                    return <div key={user._id} className={`specific-img-wrapper ${selectedPerson?._id === user._id ? 'select' : ''}`}  onClick={() => onHandlePersonFilterBy(user)} > 
                                            <Tooltip title={`${user.firstName} ${user.lastName}`}>
                                                    <img className="specific-img" src={user.profileImg} alt=""/>
                                            </Tooltip>
                                        </div>
                                })}
                            </section>
                        </section>
                    )
                }}
            >
                {!selectedPerson && <div className={`people-filter-btn clickable clear select size-32 icon-start i-PersonRound ${isMenuOpen ? 'active' : ''}`} >Person</div>}
                {selectedPerson && <div className={`people-filter-btn-active clickable clear select size-32 ${isMenuOpen ? 'active' : ''}`} >
                    <div className="profile-img-wrapper">
                        <img src={selectedPerson.profileImg} alt="" />
                    </div>
                    Person
                    <div onClick={onRemovePersonFilterBy} className="close-btn clickable clear select icon-btn size-24 i-CloseRound"></div></div>}
            </PopUpMenu>

        </section>
    )
}