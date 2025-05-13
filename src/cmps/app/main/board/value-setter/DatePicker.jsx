// === Style
import 'react-datepicker/dist/react-datepicker.css';

// === Libs
import { useState } from "react";
import DatePicker from 'react-datepicker';
import range from 'lodash/range';
import { getYear, getMonth } from 'date-fns';

// ====== Component ======
// =======================

export function DatePickerColumn({ onCloseModal, setDate, defaultDate }) {
    // === Consts
    const [selectedDate, setSelectedDate] = useState(defaultDate || new Date())
    const [showTimePicker, setShowTimePicker] = useState(false);

    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]


    // === Functions
    function onClickToday() {
        const now = new Date()
        setSelectedDate(now)
    }

    function handleSave(date) {
       setDate(date.getTime())
        if (onCloseModal) onCloseModal()
    }

    return (
        <section className='date-picker'>

            <DatePicker inline
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date)
                    handleSave(date)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(selectedDate);
                }}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="date-picker-container" >
                        <div className={`time-btn clickable clear size-32 i-Time ${showTimePicker ? 'active' : ''}`}
                            onClick={() => { setShowTimePicker(prev => !prev) }} />
                        <div className='today-btn clickable clear size-32' onClick={() => onClickToday()} >Today</div>
                        {showTimePicker ?
                            (<DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date)
                                    handleSave(date)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave(selectedDate);
                                }}
                                dateFormat="   dd/MM/yyyy      |    h:mm aa"
                                open={false}
                            />) : (<DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date)
                                    handleSave(date)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave(selectedDate);
                                }}
                                dateFormat="   dd/MM/yyyy"
                                open={false}

                            />)}
                        <select className="year-btn clickable clear size-40"
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select className="month-btn clickable clear size-40"
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="move-btns">
                            <div className="prev-btn i-DropdownChevronLeft clickable clear size-40" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />

                            <div className="next-btn i-DropdownChevronRight  clickable clear size-40" onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
                        </div>

                    </div>
                )}

            />
        </section>
    )
}