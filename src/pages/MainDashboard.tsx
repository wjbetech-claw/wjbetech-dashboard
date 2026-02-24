import React from 'react'
import Navbar from '../ui/navbar'

const RepoCard = ({repo}:{repo:any}) => (
  <div className="card" style={{marginBottom:12}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>
        <div style={{fontWeight:700}}>{repo.name}</div>
        <div style={{color:'var(--muted)',fontSize:'0.9rem'}}>{repo.desc}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontWeight:700}}>{repo.status}</div>
        <div style={{color:'var(--muted)',fontSize:'0.9rem'}}>{repo.lastCommit}</div>
      </div>
    </div>
  </div>
)

export default function MainDashboard(){
  const repos = [
    {name:'wjbetech-dashboard', desc:'Main dashboard app', status:'OK', lastCommit:'2h ago'},
    {name:'openclaw-config', desc:'Infra/config', status:'Failing', lastCommit:'1d ago'}
  ]
  const jobs = [
    {title:'Frontend Dev (Remote)', company:'Acme'},
    {title:'Prompt Engineer', company:'DeepLabs'}
  ]
  return (
    <div>
      <Navbar />
      <div style={{padding:20}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
          <section>
            <div className="card">
              <h2 style={{margin:0}}>Active Job</h2>
              <p style={{color:'var(--muted)'}}>Auto-selected from recent activity</p>
              <div style={{marginTop:12}}>
                <h3 style={{margin:'6px 0'}}>Fix CI flaky tests</h3>
                <p style={{color:'var(--muted)'}}>Signal: last commit on feature/ci-fix</p>
                <button className="cursor-pointer" style={{marginTop:8}}>Open PR</button>
              </div>
            </div>

            <div style={{marginTop:16}}>
              <h3>Repositories</h3>
              {repos.map(r=> <RepoCard key={r.name} repo={r} />)}
            </div>
          </section>

          <aside>
            <div className="card">
              <h3 style={{margin:0}}>Job Listings</h3>
              <ul style={{marginTop:12}}>
                {jobs.map((j,i)=>(
                  <li key={i} style={{marginBottom:10}}>
                    <a className="cursor-pointer" href="#">{j.title} — {j.company}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{marginTop:16}} className="card">
              <h4 style={{margin:0}}>Recent Commits</h4>
              <ul style={{marginTop:12}}>
                <li style={{color:'var(--muted)'}}>feat: add theme switcher — 2h ago</li>
                <li style={{color:'var(--muted)'}}>fix: dynamic import vite plugin — 1d ago</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
