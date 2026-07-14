import { useState } from "react"

const Filter = ({ShowPartTime,setShowPartTime}) => {
  return (
    <div className ="max-w-sm mb-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 px-6 py-4 flex items-center justify-between">
    <label>
    <input type = "checkBox"
    checked = {ShowPartTime}
    onChange={(e) => setShowPartTime(e.target.checked)}
 />
        Show Part-Time Only
        </label>  
        </div> 
     </div>
  )
}
export default Filter;