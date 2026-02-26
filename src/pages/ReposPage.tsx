import React, { useEffect, useState } from 'react'
import Card from '../ui/card'
import { Badge } from '../ui/badge'
import { Table, THead, TBody, TR, TH, TD } from '../ui/table'
import { getRepos } from '../services/api'

export default function ReposPage(){
  const [repos, setRepos] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    getRepos().then((data) => setRepos(data.repos || []))
  }, [])

  const filtered = filter === 'all' ? repos : repos.filter((r) => r.status === filter)

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Repositories' subtitle='Workflow health & PR activity'>
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          {['all','green','yellow','red'].map((f) => (
            <button key={f} className='cursor-pointer' onClick={()=>setFilter(f)} style={{padding:'4px 10px',border:'1px solid var(--border)',borderRadius:999,background: f===filter ? 'var(--panel)' : 'transparent'}}>{f}</button>
          ))}
        </div>
        <Table>
          <THead>
            <TR>
              <TH>Repository</TH>
              <TH>Status</TH>
              <TH>Open PRs</TH>
              <TH>Workflows</TH>
            </TR>
          </THead>
          <TBody>
            {filtered.map((repo) => (
              <TR key={repo.id}>
                <TD><strong>{repo.name}</strong></TD>
                <TD>
                  <Badge variant={repo.status === 'green' ? 'success' : repo.status === 'yellow' ? 'warning' : repo.status === 'red' ? 'danger' : 'outline'}>
                    {repo.status || 'unknown'}
                  </Badge>
                </TD>
                <TD>{repo.openPRs ?? 0}</TD>
                <TD>{repo.workflows ?? 0}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
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
