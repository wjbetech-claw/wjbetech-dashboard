import React, { useEffect, useState } from 'react'

export default function RepoMeta({owner,repo}:{owner:string,repo:string}){
  const [meta, setMeta] = useState<any | null>(null)
  useEffect(()=>{
    let mounted = true
    fetch(`/api/repo-activities/${owner}/${repo}`)
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
