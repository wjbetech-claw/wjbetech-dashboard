import * as React from 'react'

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }){
  return (
    <div style={{padding:12,border:'1px solid var(--color-error)',borderRadius:10,background:'rgba(239,68,68,0.08)'}}>
      <div style={{fontWeight:600,color:'var(--color-error)'}}>Error</div>
      <div style={{fontSize:12,marginTop:4}}>{message}</div>
      {onRetry ? <button className='cursor-pointer' onClick={onRetry} style={{marginTop:8,padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Retry</button> : null}
    </div>
  )
}
