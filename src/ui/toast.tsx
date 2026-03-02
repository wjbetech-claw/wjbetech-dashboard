import React from 'react'

export function Toast({message}:{message:string}){
  if(!message) return null
  return (
    <div style={{position:'fixed',right:20,bottom:20,background:'rgba(0,0,0,0.85)',color:'#fff',padding:'8px 12px',borderRadius:6,boxShadow:'0 6px 18px rgba(0,0,0,0.2)'}}>
      {message}
    </div>
  )
}

export default Toast
