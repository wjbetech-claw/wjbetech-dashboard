import React from 'react'
import Card from '../ui/card'

const items = [
  { title: 'Deploy completed', meta: 'payments-api • 2m ago', status: 'success' },
  { title: 'Rollback triggered', meta: 'edge-gateway • 10m ago', status: 'warning' },
  { title: 'PR merged', meta: 'web-dashboard • 25m ago', status: 'info' },
  { title: 'Incident resolved', meta: 'auth-service • 1h ago', status: 'success' },
]

export default function RecentActivity(){
  return (
    <Card title='Recent activity' subtitle='Latest updates across environments'>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {items.map((item) => (
          <div key={item.title} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
            <div>
              <div style={{fontWeight:600}}>{item.title}</div>
              <div style={{fontSize:12,opacity:0.7}}>{item.meta}</div>
            </div>
            <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid var(--border)'}}>{item.status}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
