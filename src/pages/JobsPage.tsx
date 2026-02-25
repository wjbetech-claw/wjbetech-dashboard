import React from 'react'
import Card from '../ui/card'

const jobs = [
  { title: 'Senior Frontend Engineer', company: 'WJB Labs', location: 'Remote', type: 'Full-time', status: 'Applied' },
  { title: 'Platform Engineer', company: 'Nimbus', location: 'NYC / Hybrid', type: 'Full-time', status: 'Saved' },
  { title: 'Design Systems Lead', company: 'Arcadia', location: 'Remote', type: 'Contract', status: 'New' },
]

export default function JobsPage(){
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
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {jobs.map((job) => (
            <div key={job.title} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{job.title}</div>
                <div style={{fontSize:12,opacity:0.7}}>{job.company} • {job.location} • {job.type}</div>
              </div>
              <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid var(--border)'}}>{job.status}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title='Job discovery' subtitle='Suggested matches'>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12}}>
          {['Full‑stack Engineer', 'DevRel Lead', 'AI Platform Engineer'].map((role) => (
            <div key={role} style={{border:'1px solid var(--border)',borderRadius:10,padding:12}}>
              <div style={{fontWeight:600}}>{role}</div>
              <div style={{fontSize:12,opacity:0.7,marginTop:6}}>Remote • High match</div>
              <button className='cursor-pointer' style={{marginTop:10,padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>View details</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
