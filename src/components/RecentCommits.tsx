import React from 'react'

export default function RecentCommits({commits}:{commits:any[]}){
  return (
    <div className='card'>
      <h4 style={{margin:0}}>Recent Commits</h4>
      <ul style={{marginTop:12}}>
        {commits.map((c,i)=>(
          <li key={i} style={{color:'var(--muted)'}}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
