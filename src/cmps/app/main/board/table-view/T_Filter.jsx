// === Libs

// === Services

// === Actions
import { useSelector } from "react-redux"
import { addTask } from "../../../../../store/actions/board.actions.js"

// === Hooks / React

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu.jsx"
import { AddNewSelection } from "../value-setter/AddNewSelection.jsx"
import { useEffect, useRef, useState } from "react"
import { useControlledInput } from "../../../../../hooks/useControlledInput.js"
import { setFilterBy } from "../../../../../store/actions/board.actions.js"
import { debounce } from "../../../../../services/base/util.service.js"

// ====== Component ======
// =======================

export function T_Filter({ /* prop1, prop2 */ }) {
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    const [isInput, setIsInput] = useState(false)
    const [isExitBtn, setIsExitBtn] = useState(false)
    const [hasText, setHasText] = useState(false)
    const [value, setValue] = useState('')

    const debouncedSetFilterBy = useRef(
        debounce((val) => {
        try {
            setFilterBy({ txt: val })
        } catch (err) {
            showErrorMsg('Something went wrong')
        }
        }, 300)
    )

    // === Consts

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

        // try {
        //     setFilterBy({ txt: val })
        // }
        // catch (err) {
        //     showErrorMsg(`Somthing went wrong`)
        // }
    }

    function onHandleOnBlur() {
        if (!value.trim()) {
            setIsInput(false)
            setIsExitBtn(false)
        }
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_Filter">
            <div className="split-button size-32 filled new-item-btn">
                <div className="clickable btn-left filled" onClick={onAddTask}>New item</div>
                <div className="seperator"></div>
                    <PopUpMenu
                        position="bottom-start"
                        renderContent={({ onCloseModal }) => (
                            <AddNewSelection onCloseModal={onCloseModal} />
                        )}>
                        <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
                     </PopUpMenu>

            </div>
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
                            setFilterBy({ txt: '' }) 
                            setTimeout(() => {document.querySelector('.filter-input input')?.focus()}, 0)
                            }}></button>
                </div>
            )
            : (<div className="search-btn clickable clear size-32 icon-start i-Search txt-search" onClick={() => setIsInput(true)}>Search</div> )}
        </section>
    )
}