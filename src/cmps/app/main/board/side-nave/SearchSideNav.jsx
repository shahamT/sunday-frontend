// === Libs

import { useEffect, useRef, useState } from "react"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { useSelector } from "react-redux"
import { setBoardsFilterBy } from "../../../../../store/actions/board.actions"
import { debounce } from "../../../../../services/base/util.service"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function SearchSideNav({ setSearchOpen }) {

    const [value, setValue] = useState('')
    // === Consts
    const debounceSetBoardFilterBy = useRef(
        debounce((val) => {
            try {
                setBoardsFilterBy({ txt: val })
            } catch (err) {
                showErrorMsg('Something went wrong')
            }
        }, 300)
    )

    // === Effects
    useEffect(() => {
        return () => {
            debounceSetBoardFilterBy.current.cancel()
        }
    }, [])

    
    // === Functions
    function onSetBoardsFilterBy({ target }) {
        const val = target.value
        setValue(val)
        debounceSetBoardFilterBy.current(val)
    }


    return (
        <section className="search-side-nav">

            <span className="i-Search input-icon" />
            <input
                type="text"
                value={value}
                placeholder='Search in Main workspace'
                autoFocus
                onChange={onSetBoardsFilterBy}
                className="search-board-input"
            />

            <div
                className="close-btn clickable clear icon-btn size-24 i-CloseSmall"
                onClick={() => {
                    setSearchOpen(false)
                    setValue('')
                    setBoardsFilterBy({ txt: '' })


                }}
            />


        </section>
    )
}