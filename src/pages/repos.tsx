import React, {useEffect, useState, Suspense, lazy} from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

const RepoMeta = lazy(() => import('../components/RepoMeta'))

type Repo = { id:number; name:string; full_name:string; url?:string }

export default function ReposPage(){
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/api/featured')
      .then(r=>r.json())
      .then(d=>{ setRepos(d || []); setLoading(false) })
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
                <Suspense fallback={<span>Loading...</span>}>
                  <RepoMeta owner={r.full_name.split('/')[0]} repo={r.name} />
                </Suspense>
              </small>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

