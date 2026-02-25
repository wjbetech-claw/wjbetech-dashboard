import React from 'react'
import Card from '../ui/card'

const envs = [
  { name: 'Production', nodes: 18, uptime: '99.98%', region: 'us-east-1' },
  { name: 'Staging', nodes: 6, uptime: '99.2%', region: 'us-west-2' },
  { name: 'QA', nodes: 4, uptime: '98.6%', region: 'eu-central-1' },
]

export default function EnvironmentsGrid(){
  return (
    <Card title='Environments' subtitle='Health and footprint by cluster'>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
        {envs.map((env) => (
          <div key={env.name} style={{border:'1px solid var(--border)',borderRadius:10,padding:12}}>
            <div style={{fontWeight:600}}>{env.name}</div>
            <div style={{fontSize:12,opacity:0.7,marginTop:6}}>Region: {env.region}</div>
            <div style={{fontSize:12,opacity:0.7}}>Nodes: {env.nodes}</div>
            <div style={{fontSize:12,opacity:0.7}}>Uptime: {env.uptime}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
