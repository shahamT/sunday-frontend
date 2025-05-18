

// ====== Component ======
// =======================

export function ColSumNumber({ column,columnValues }) {


    // === Functions
const sum= columnValues.reduce((acc,currNun)=>{
    return acc+ currNun
},0)

    // if (!data) return <div>Loading...</div>
    return (
        <section className="col-sum-number">
            <p>{sum}</p>
            <p>sum</p>
        </section>
    )
}