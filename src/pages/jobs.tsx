import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export default function JobsPage(){
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [repo, setRepo] = useState('')

  useEffect(()=>{
    fetch('/api/jobs')
      .then(r=>r.json())
      .then(d=>{ setJobs(d.jobs || []); setLoading(false) })
      .catch(()=>setLoading(false))
  },[])

  async function createJob(){
    const payload = { repo_full_name: repo, title }
    try{
      const res = await fetch('/api/jobs',{ method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if (res.ok){
        const data = await res.json()
        setJobs(prev=>[data.job, ...prev])
        setTitle(''); setRepo('')
      }else{
        console.error('create failed')
      }
    }catch(e){ console.error(e) }
  }

  async function updateJob(id:number, fields:any){
    try{
      const res = await fetch(`/api/jobs/${id}`,{ method:'PATCH', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(fields) })
      if(res.ok){
        const data = await res.json()
        setJobs(prev=>prev.map(j=> j.id===data.job.id ? data.job : j))
      }
    }catch(e){ console.error(e) }
  }

  const cols = {
    todo: jobs.filter(j=> j.status==='todo'),
    inprogress: jobs.filter(j=> j.status==='inprogress'),
    done: jobs.filter(j=> j.status==='done')
  }

  return (
    <div style={{padding:20}}>
      <h1 style={{fontSize:24,marginBottom:12}}>Jobs & Kanban</h1>
      <p style={{marginBottom:16}}>Kanban board scaffold for jobs. Backend persistence enabled for create/update.</p>

      <div style={{marginBottom:12,display:'flex',gap:8}}>
        <input placeholder="repo_full_name (owner/repo)" value={repo} onChange={e=>setRepo(e.target.value)} />
        <input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
        <Button onClick={createJob}>Create job</Button>
      </div>

      {loading && <div>Loading…</div>}

      <div style={{display:'flex',gap:12}}>
        <Card style={{flex:1}}>
          <h3>To do</h3>
          <div style={{minHeight:200}}>
            {cols.todo.map(j=> (
              <JobCard key={j.id} job={j} onUpdate={updateJob} />
            ))}
          </div>
        </Card>
        <Card style={{flex:1}}>
          <h3>In progress</h3>
          <div style={{minHeight:200}}>
            {cols.inprogress.map(j=> (
              <JobCard key={j.id} job={j} onUpdate={updateJob} />
            ))}
          </div>
        </Card>
        <Card style={{flex:1}}>
          <h3>Done</h3>
          <div style={{minHeight:200}}>
            {cols.done.map(j=> (
              <JobCard key={j.id} job={j} onUpdate={updateJob} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function JobCard({job, onUpdate}:{job:any,onUpdate:(id:number,fields:any)=>void}){
  return (
    <div style={{padding:8,marginBottom:8,border:'1px solid var(--border)',borderRadius:6,background:'var(--panel)'}}>
      <div style={{fontWeight:700}}>{job.title}</div>
      <div style={{fontSize:12,color:'var(--muted)'}}>{job.repo_full_name}</div>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <Button onClick={()=>onUpdate(job.id,{ status: 'inprogress' })}>Start</Button>
        <Button onClick={()=>onUpdate(job.id,{ status: 'done' })}>Done</Button>
      </div>
    </div>
  )
}
