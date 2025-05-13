import { useState } from 'react';

export function useSelected(initial = null) {
  const [selected, setSelected] = useState(initial);

  function isSelected(id) {
    return selected === id;
  }

  function select(id) {
    setSelected(id);
  }

  return {
    selected,
    isSelected,
    select,
  };
}

// example usage:
// 1. import the hook
// 2. declare { selected, isSelected, select }
// 3. give elements keys
// 4. apply "active" className and rendered content based on isSelected
// 5. set onClick function {() => select("item-key")}


// import { useSelected } from './useSelected';

// export function TabBar() {
//   const { selected, isSelected, select } = useSelected('tab-1');

//   return (
    // <div className="tab-bar">
     
    //     <div key="tab-1"
    //       className={`tab ${isSelected("tab-1") ? 'active' : ''}`}
    //       onClick={() => select("tab-1")}>
    //     </div>
    //     <div key="tab-2"
    //       className={`tab ${isSelected("tab-1") ? 'active' : ''}`}
    //       onClick={() => select("tab-1")}>
    //     </div>
    

    //   <div className="tab-content">
    //     {isSelected('tab-1') && <p>This is the Info tab</p>}
    //     {isSelected('tab-2') && <p>Settings content goes here</p>}
    //   </div>
    // </div>
//   );
// }