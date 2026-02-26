import React, { memo } from 'react'
import Card from '../ui/card'

const stats = [
  { label: 'Active pipelines', value: '12', delta: '+2' },
  { label: 'Avg. deploy time', value: '4m 18s', delta: '-12%' },
  { label: 'Incidents (7d)', value: '3', delta: '-1' },
  { label: 'Success rate', value: '98.4%', delta: '+0.6%' },
]

function OverviewStats(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
      {stats.map((item) => (
        <Card key={item.label}>
          <div style={{fontSize:12,opacity:0.7}}>{item.label}</div>
          <div style={{fontSize:22,fontWeight:700,marginTop:6}}>{item.value}</div>
          <div style={{fontSize:12,marginTop:4,opacity:0.8}}>Delta {item.delta}</div>
        </Card>
      ))}
    </div>
  )
}


export default memo(OverviewStats)
