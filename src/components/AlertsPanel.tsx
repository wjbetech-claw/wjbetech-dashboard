import React, { memo } from 'react'
import Card from '../ui/card'

const alerts = [
  { title: 'Elevated latency', meta: 'edge-gateway • p95 > 400ms', severity: 'high' },
  { title: 'Queue backlog', meta: 'billing-worker • 152 jobs', severity: 'medium' },
  { title: 'SSL expiry', meta: 'cdn-edge • 12 days left', severity: 'low' },
]

function AlertsPanel(){
  return (
    <Card title='Alerts' subtitle='Active notices to review'>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {alerts.map((alert) => (
          <div key={alert.title} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
            <div>
              <div style={{fontWeight:600}}>{alert.title}</div>
              <div style={{fontSize:12,opacity:0.7}}>{alert.meta}</div>
            </div>
            <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid var(--border)'}}>{alert.severity}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}


export default memo(AlertsPanel)
