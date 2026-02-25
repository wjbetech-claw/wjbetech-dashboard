import React from 'react'
import Card from '../ui/card'

const repos = [
  { name: 'wjbetech-dashboard', status: 'Green', prs: 4, workflows: 12 },
  { name: 'wjbetech-api', status: 'Yellow', prs: 2, workflows: 7 },
  { name: 'edge-gateway', status: 'Red', prs: 1, workflows: 3 },
]

export default function ReposPage(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Repositories' subtitle='Workflow health & PR activity'>
        <div style={{display:'grid',gridTemplateColumns:'1fr 120px 120px 120px',gap:12,fontSize:12,opacity:0.7,borderBottom:'1px solid var(--border)',paddingBottom:8}}>
          <div>Repository</div><div>Status</div><div>Open PRs</div><div>Workflows</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:8}}>
          {repos.map((repo) => (
            <div key={repo.name} style={{display:'grid',gridTemplateColumns:'1fr 120px 120px 120px',gap:12,alignItems:'center'}}>
              <div style={{fontWeight:600}}>{repo.name}</div>
              <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid var(--border)'}}>{repo.status}</span>
              <div>{repo.prs}</div>
              <div>{repo.workflows}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title='Recent pull requests' subtitle='Review queue'>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {['Add billing webhooks', 'Fix theme token mapping', 'Upgrade workflows'].map((item) => (
            <div key={item} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{item}</div>
                <div style={{fontSize:12,opacity:0.7}}>wjbetech-dashboard • awaiting review</div>
              </div>
              <button className='cursor-pointer' style={{padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Open</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
