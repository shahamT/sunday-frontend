
// ====== Component ======
// =======================
export function ColSumDate({ group, columnValues }) {
    const colorMap = {
        american_gray: "#757575",
        american_gray_selected: "#bfbfbf",
        winter: "#9aadbd",
        winter_selected: "#ccd6de",
        grass_green: "#037f4c",
        grass_green_selected: "#81bfa5",
        done_green: "#00c875",
        done_green_selected: "#80e3ba",
        bright_green: "#9cd326",
        bright_green_selected: "#cde992",
        saladish: "#cab641",
        saladish_selected: "#e4daa0",
        egg_yolk: "#ffcb00",
        egg_yolk_selected: "#ffe580",
        working_orange: "#fdab3d",
        working_orange_selected: "#fed59e",
        dark_orange: "#ff6d3b",
        dark_orange_selected: "#ffb196",
        peach: "#ffadad",
        peach_selected: "#ffd6d6",
        sunset: "#ff7575",
        sunset_selected: "#ffbaba",
        stuck_red: "#df2f4a",
        stuck_red_selected: "#f0a1ad",
        dark_red: "#bb3354",
        dark_red_selected: "#dd99a9",
        sofia_pink: "#e50073",
        sofia_pink_selected: "#ff8ac4",
        lipstick: "#ff5ac4",
        lipstick_selected: "#fface1",
        bubble: "#faa1f1",
        bubble_selected: "#fcd0f8",
        purple: "#9d50dd",
        purple_selected: "#d0aeed",
        dark_purple: "#784bd1",
        dark_purple_selected: "#bba5e8",
        berry: "#7e3b8a",
        berry_selected: "#be9dc4",
        dark_indigo: "#401694",
        dark_indigo_selected: "#a08bc9",
        indigo: "#5559df",
        indigo_selected: "#aaacef",
        navy: "#225091",
        navy_selected: "#90a7c8",
        bright_blue: "#579bfc",
        bright_blue_selected: "#abcdfd",
        dark_blue: "#007eb5",
        dark_blue_selected: "#80c2df",
        aquamarine: "#4eccc6",
        aquamarine_selected: "#a6e5e2",
        chili_blue: "#66ccff",
        chili_blue_selected: "#b2e5ff",
        river: "#74afcc",
        river_selected: "#b3d0de",
        explosive: "#c4c4c4",
        explosive_selected: "#e1e1e1",
        blackish: "#333333",
        blackish_selected: "#999999",
        brown: "#7f5347",
        brown_selected: "#bfa9a3",
        orchid: "#e484bd",
        orchid_selected: "#ecbad7",
        tan: "#bca58a",
        tan_selected: "#d6cabc",
        sky: "#a1e3f6",
        sky_selected: "#d0f1fa",
        coffee: "#cd9282",
        coffee_selected: "#dec0b7",
        royal: "#216edf",
        royal_selected: "#95bbf2",
        teal: "#175a63",
        teal_selected: "#8bacb1",
        lavender: "#bda8f9",
        lavender_selected: "#ded4fc",
        steel: "#a9bee8",
        steel_selected: "#d4dff4",
        lilac: "#9d99b9",
        lilac_selected: "#ceccdc",
        pecan: "#563e3e",
        pecan_selected: "#ab9f9f"
    }



    const today = new Date()
    const minDate = new Date(Math.min(...columnValues))
    const maxDate = new Date(Math.max(...columnValues))
    const totalRangeDates = (maxDate - minDate) / (1000 * 60 * 60 * 24)
    const passedTime = (today - minDate) / (1000 * 60 * 60 * 24)
    const leftTime = (passedTime / totalRangeDates) * 100

    const snakeCaseColor = group.color.replace(/-/g, '_')
    const shouldShowRange = !isNaN(minDate) && !isNaN(maxDate) && minDate < maxDate
    
    
    
    // === Functions
    function formatDateRange(startDate, endDate) {
        const sameDay = startDate.toDateString() === endDate.toDateString()
        const sameYear = startDate.getFullYear() === endDate.getFullYear()
        const sameMonth = startDate.getMonth() === endDate.getMonth()
    
        const optionsStart = {
            month: 'short',
            day: 'numeric',
            ...(sameYear ? {} : { year: '2-digit' }),
        }
    
        const optionsEnd = {
            day: 'numeric',
            ...(sameYear ? {} : { year: '2-digit' }),
            ...(sameMonth ? {} : { month: 'short' }),
        }
    
        const formattedStart = startDate.toLocaleDateString('en-US', optionsStart)
        const formattedEnd = endDate.toLocaleDateString('en-US', optionsEnd)
    
        return sameDay ? formattedStart : `${formattedStart} - ${formattedEnd}`
    }
    

    function getDaysDiff(startDate, endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const diffInMs = end - start
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

        return Math.round(diffInDays)
    }

    return (
        <section className="col-som-date">
            {shouldShowRange ?
                <div className="date-range-wrapper"
                    style={{
                        background: `linear-gradient(to right, ${colorMap[snakeCaseColor]} ${leftTime}%, ${colorMap[`${snakeCaseColor}_selected`]} 0%)`
                    }}>
                    <p className="txt">{formatDateRange(minDate, maxDate)}</p>
                    <p className="txt-hover">{getDaysDiff(minDate, maxDate)}d</p>

                </div>

                : <div className="date-range-wrapper"
                    style={{
                        background: `linear-gradient(to right, #3333 100%, #3333 0%)`
                    }}>

                </div>}
        </section>
    )
}