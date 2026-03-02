import React, {useEffect, useState} from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export default function Overview(){
  const [featured, setFeatured] = useState<any[]>([])
  const [activeJob, setActiveJob] = useState<any|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    Promise.all([
      fetch('/api/github/featured').then(r=>r.json()).catch(()=>({repos:[]})),
      fetch('/api/active-job').then(r=>r.json()).catch(()=>({job:null}))
    ]).then(([f,a])=>{
      setFeatured(f.repos||[])
      setActiveJob(a.job||null)
      setLoading(false)
    })
  },[])

  return (
    <div style={{padding:20}}>
      <h1 style={{fontSize:24,marginBottom:12}}>Overview</h1>
      {loading && <div>Loading…</div>}
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:12}}>
        <div>
          <Card>
            <h3>Featured Repositories</h3>
            {featured.map(r=> (
              <div key={r.id} style={{padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                <a href={r.url} target="_blank" rel="noreferrer">{r.full_name}</a>
                <div style={{fontSize:12,color:'var(--muted)'}}>Latest: placeholder</div>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <Card>
            <h3>Active Job</h3>
            {activeJob ? (
              <div>
                <div style={{fontWeight:700}}>{activeJob.title || activeJob.repo_full_name}</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>Updated: {new Date(activeJob.updated_at||activeJob.created_at||Date.now()).toLocaleString()}</div>
                <div style={{marginTop:8}}><Button asChild><a href={`/repos/${activeJob.repo_full_name}`} >Open repo</a></Button></div>
              </div>
            ) : (
              <div>No active job detected</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

