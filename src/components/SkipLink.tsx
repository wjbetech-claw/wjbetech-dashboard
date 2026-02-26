import React from 'react'

export default function SkipLink(){
  return (
    <a href="#main-content" style={{position:'absolute',left:-9999,top:8,background:'var(--panel)',padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,zIndex:999}} onFocus={(e)=>{(e.currentTarget as HTMLElement).style.left='8px'}} onBlur={(e)=>{(e.currentTarget as HTMLElement).style.left='-9999px'}}>
      Skip to content
    </a>
  )
}
