// === Style
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import range from 'lodash/range';
import { getYear, getMonth } from 'date-fns';
import { useState } from "react";

// === Libs

// === Services

// === Actions


// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DatePicker({ /* prop1, prop2 */ }) {

    // === Consts
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())

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
    // === Effects


    // === Functions
    function onToday() {
        const now = new Date()
        setStartDate(now)
        setSelectedDate(now)
        setStartTime(now)

    }

    function handleSave(date) {
        console.log('Saving date:', date.toISOString());
      }

    return (
        <section className='date-picker'>

            <DatePicker inline
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
                        <div className='today-btn clickable clear size-32' onClick={() => onToday()} >Today</div>
                        {showTimePicker ?
                            (<DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave(startDate);
                                  }}
                                dateFormat="   dd/MM/yyyy      |    h:mm aa"
                                open={false}
                            />) : (<DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave(startDate);
                                  }}
                                dateFormat="dd/MM/yyyy"
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
        </section>
    );
};