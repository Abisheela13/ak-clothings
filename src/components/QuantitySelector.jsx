import React from 'react'

export default function QuantitySelector({value, onChange}){
  return (
    <div className="inline-flex items-center border rounded overflow-hidden">
      <button className="px-3" onClick={()=>onChange(Math.max(1, value-1))}>-</button>
      <div className="px-4">{value}</div>
      <button className="px-3" onClick={()=>onChange(value+1)}>+</button>
    </div>
  )
}
