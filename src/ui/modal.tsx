import * as React from 'react'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }){
  if (!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}} role="dialog" aria-modal="true" aria-label={title}>
      <div style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:16,padding:20,width:'min(520px,90vw)',boxShadow:'0 20px 40px rgba(15,23,42,0.25)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:16}}>{title}</div>
          <button className='cursor-pointer' onClick={onClose} style={{border:'1px solid var(--border)',borderRadius:8,background:'transparent',padding:'2px 6px'}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
