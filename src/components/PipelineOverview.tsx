import React, { memo } from 'react'
import Card from '../ui/card'

const pipelines = [
  { name: 'web-dashboard', env: 'prod', status: 'running', progress: 68 },
  { name: 'payments-api', env: 'staging', status: 'queued', progress: 12 },
  { name: 'edge-gateway', env: 'prod', status: 'success', progress: 100 },
]

function PipelineOverview(){
  return (
    <Card title='Pipeline overview' subtitle='Status across primary services'>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {pipelines.map((pipeline) => (
          <div key={pipeline.name} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{pipeline.name}</div>
              <div style={{fontSize:12,opacity:0.7}}>{pipeline.env} • {pipeline.status}</div>
              <div style={{height:6,borderRadius:999,background:'var(--border)',marginTop:8}}>
                <div style={{height:'100%',borderRadius:999,background:'var(--primary-500,#6366f1)',width:`${pipeline.progress}%`}} />
              </div>
            </div>
            <div style={{fontSize:12,opacity:0.7}}>{pipeline.progress}%</div>
          </div>
        ))}
      </div>
    </Card>
  )
}


export default memo(PipelineOverview)
