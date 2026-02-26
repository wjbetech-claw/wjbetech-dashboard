import React, { useEffect, useState } from 'react'
import Card from '../ui/card'
import { Badge } from '../ui/badge'
import { getJobs, updateJobStatus } from '../services/api'
import { EmptyState } from '../ui/empty-state'

export default function JobsPage(){
  const [jobs, setJobs] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    getJobs().then((data) => setJobs(data.jobs || []))
  }, [])

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter)

  function onAction(id: string, action: 'save' | 'apply'){
    updateJobStatus(id, action).catch(() => {})
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: action === 'save' ? 'saved' : 'applied' } : j))
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Jobs pipeline' subtitle='Track applications and job discovery'>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
          <Card title='Open roles' subtitle='Active listings'>
            <div style={{fontSize:24,fontWeight:700}}>48</div>
            <div style={{fontSize:12,opacity:0.7}}>+6 this week</div>
          </Card>
          <Card title='Saved' subtitle='Shortlist'>
            <div style={{fontSize:24,fontWeight:700}}>12</div>
            <div style={{fontSize:12,opacity:0.7}}>Review today</div>
          </Card>
          <Card title='Applied' subtitle='In progress'>
            <div style={{fontSize:24,fontWeight:700}}>9</div>
            <div style={{fontSize:12,opacity:0.7}}>2 awaiting reply</div>
          </Card>
        </div>
      </Card>

      <Card title='Active applications' subtitle='Most recent activity'>
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          {['all','discovered','saved','applied'].map((f) => (
            <button key={f} className='cursor-pointer' onClick={()=>setFilter(f)} style={{padding:'4px 10px',border:'1px solid var(--border)',borderRadius:999,background: f===filter ? 'var(--panel)' : 'transparent'}}>{f}</button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {filtered.length === 0 ? (
            <EmptyState title='No jobs found' message='Try another filter or check back later.' />
          ) : filtered.map((job) => (
            <div key={job.id} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{job.title}</div>
                <div style={{fontSize:12,opacity:0.7}}>{job.company}</div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <Badge variant={job.status === 'saved' ? 'warning' : job.status === 'applied' ? 'success' : 'outline'}>{job.status}</Badge>
                <button className='cursor-pointer' onClick={()=>onAction(job.id, 'save')} style={{padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Save</button>
                <button className='cursor-pointer' onClick={()=>onAction(job.id, 'apply')} style={{padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
