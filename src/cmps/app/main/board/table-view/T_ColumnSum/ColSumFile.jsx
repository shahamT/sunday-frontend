

// ====== Component ======
// =======================

export function ColSumFile({ columnValues }) {

    const sum = columnValues.length
    // === Functions
    const formattedSum = sum.toLocaleString()

    return (
        <section className="col-sum-file">
            <p>{formattedSum}</p>
            {sum === 1 ? <p>file</p>
                : <p>files</p>
            }
        </section>
    )
}