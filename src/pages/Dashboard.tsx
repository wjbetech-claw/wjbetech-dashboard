import React from 'react'
import Button from '../ui/button'

export default function Dashboard() {
  const dummyJobs = [
    { id: 1, title: 'Frontend Developer (Remote)', company: 'Acme', location: 'Remote' },
    { id: 2, title: 'Prompt Engineer', company: 'DeepLabs', location: 'London' },
  ]

  return (
    <div style={{padding:24}}>
      <header style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>wjbetech-dashboard</h1>
        <div><Button>New Job</Button></div>
      </header>
      <main style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginTop:20}}>
        <section className="card">
          <h2>Active Job</h2>
          <div style={{marginTop:12}}>
            <strong>Working on: Fix CI flaky tests</strong>
            <p style={{color:'var(--muted)'}}>Signal: last commit on feature/ci-fix</p>
            <Button variant="ghost">Open PR</Button>
          </div>
        </section>
        <aside className="card">
          <h3>Job Listings</h3>
          <ul>
            {dummyJobs.map(j=> (
              <li key={j.id} style={{marginTop:8}}>
                <a href="#">{j.title} — {j.company}</a>
                <div style={{color:'var(--muted)',fontSize:'0.9rem'}}>{j.location}</div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}
