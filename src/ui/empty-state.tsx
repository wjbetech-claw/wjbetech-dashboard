import * as React from 'react'

export function EmptyState({ title, message, action }: { title: string; message: string; action?: React.ReactNode }){
  return (
    <div style={{padding:16,border:'1px dashed var(--border)',borderRadius:12,background:'var(--panel)'}}>
      <div style={{fontWeight:700,marginBottom:4}}>{title}</div>
      <div style={{fontSize:12,opacity:0.7,marginBottom:8}}>{message}</div>
      {action}
    </div>
  )
}
