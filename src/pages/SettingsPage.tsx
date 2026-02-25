import React from 'react'
import Card from '../ui/card'

const integrations = [
  { name: 'GitHub', status: 'Connected', detail: 'wjbetech-claw' },
  { name: 'Vercel', status: 'Needs auth', detail: 'Deploy status' },
  { name: 'Jira', status: 'Optional', detail: 'Import boards' },
]

export default function SettingsPage(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Settings' subtitle='Manage integrations & preferences'>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {integrations.map((item) => (
            <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{item.name}</div>
                <div style={{fontSize:12,opacity:0.7}}>{item.detail}</div>
              </div>
              <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid var(--border)'}}>{item.status}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title='Notifications' subtitle='How you receive updates'>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
          {['Email summaries', 'Slack alerts', 'In-app pings'].map((item) => (
            <div key={item} style={{border:'1px solid var(--border)',borderRadius:10,padding:12}}>
              <div style={{fontWeight:600}}>{item}</div>
              <div style={{fontSize:12,opacity:0.7,marginTop:6}}>Weekly digest enabled</div>
              <button className='cursor-pointer' style={{marginTop:10,padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Configure</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
