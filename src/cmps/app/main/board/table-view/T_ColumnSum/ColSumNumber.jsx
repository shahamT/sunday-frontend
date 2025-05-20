

// ====== Component ======
// =======================

export function ColSumNumber({ column, columnValues }) {


    // === Functions
    const sum = columnValues.reduce((acc, currNun) => {
        const int = +currNun
        return acc + int
    }, 0)

    const formattedSum = sum.toLocaleString()
    return (
        <section className="col-sum-number">
            <p>{formattedSum}</p>
            <p>sum</p>
        </section>
    )
}