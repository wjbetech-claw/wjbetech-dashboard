import React from 'react'

export default function OfflineBanner(){
  return (
    <div style={{padding:8,border:'1px solid var(--color-warning)',borderRadius:10,background:'rgba(245,158,11,0.08)',marginBottom:12}}>
      <strong>Offline:</strong> You appear to be offline. Data may be stale.
    </div>
  )
}
