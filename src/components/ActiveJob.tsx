import React from 'react'

export default function ActiveJob({job}:{job:any}){
  return (
    <div className='card'>
      <h2 style={{margin:0}}>{job.title}</h2>
      <p style={{color:'var(--muted)'}}>{job.signal}</p>
      <div style={{marginTop:12}}>
        <p style={{color:'var(--muted)'}}>Updated: {job.updated}</p>
        <button className='cursor-pointer' style={{marginTop:8}}>Open PR</button>
      </div>
    </div>
  )
}
