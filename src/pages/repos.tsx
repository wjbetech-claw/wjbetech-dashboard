import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

type Repo = { id:number; name:string; full_name:string; url?:string }

export default function ReposPage(){
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/api/github/featured')
      .then(r=>r.json())
      .then(d=>{ setRepos(d.repos || []); setLoading(false) })
      .catch(()=>setLoading(false))
  },[])

  return (
    <div style={{padding:20}}>
      <h1 style={{fontSize:24,marginBottom:12}}>Repositories</h1>
      <p style={{marginBottom:16}}>Featured repos from wjbetech and wjbetech-claw. Click a repo to view details.</p>

      {loading && <div>Loading…</div>}

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {repos.map(r=> (
          <Card key={r.id}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>{r.full_name}</div>
                <div style={{color:'var(--muted)',fontSize:13}}>{r.name}</div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <Button asChild variant="ghost">
                  <a href={r.url || '#'} target="_blank" rel="noreferrer">View</a>
                </Button>
                <Link to={`/repos/${r.full_name}`}>
                  <Button>Details</Button>
                </Link>
              </div>
            </div>
            <div style={{marginTop:8,fontSize:13,color:'var(--muted)'}}>
              <small>
                <RepoMeta owner={r.full_name.split('/')[0]} repo={r.name} />
              </small>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function RepoMeta({owner,repo}:{owner:string,repo:string}){
  const [meta, setMeta] = useState<any | null>(null)
  useEffect(()=>{
    let mounted = true
    fetch(`/api/github/repos/${owner}/${repo}/activities`)
      .then(r=>r.json())
      .then(d=>{ if(mounted) setMeta(d) })
      .catch(()=>{})
    return ()=>{ mounted=false }
  },[owner,repo])

  if(!meta) return <>Loading...</>

  const recentPRs = (meta.prs || []).slice(0,3)
  const latestJob = (meta.jobs || [])[0]

  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      <div>{recentPRs.length} PRs • {(meta.jobs||[]).length} jobs</div>
      <div style={{fontSize:13,color:'var(--muted)'}}>
        {recentPRs.map((p:any)=> (
          <div key={p.id}><a href={p.url} target="_blank" rel="noreferrer">#{p.number} {p.title}</a></div>
        ))}
        {latestJob ? (
          <div>Latest job: {latestJob.status || latestJob.state || 'unknown'} — {new Date(latestJob.updated_at||latestJob.created_at||Date.now()).toLocaleString()}</div>
        ) : null}
      </div>
    </div>
  )
}
