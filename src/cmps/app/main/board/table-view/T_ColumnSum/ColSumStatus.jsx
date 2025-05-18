// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColSumStatus({ columnValues, column }) {
    // === Consts
    // === Effects
    const totalItems = columnValues.length
    const lableSummary=lableCounter(columnValues)
    
    function lableCounter(columnValues) {
        const lableSummary = {}
        columnValues.forEach(label => {
            const key = label || 'empty'
            lableSummary[label] = (lableSummary[label] || 0) + 1
        })
        return lableSummary
        
    }

    const lableSummeryPrecent=precentCalculate(lableSummary)
    // console.log(lableSummeryPrecent)
    function precentCalculate(lableSummary){
        const percentByLabel = {}
       for (const lable in lableSummary){
        const count = lableSummary[lable]
        percentByLabel[lable] = Math.round((count/totalItems)*100)
       }
       return percentByLabel
    }
 
    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="col-sum-status">
            {/* {lableSummeryPrecent.map(lable=>{
                if (lable===column.type.lables[lable].id){
                  return  <div className="lable-status-item" key={lable} style={{width: `${lable[lable]}`,backgroundColor: `${column.type.lables[lable].color}`}}>

                    </div>
                }
            })} */}
        </section>
    )
}