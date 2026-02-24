import React from 'react'

export default function Repositories({repos}:{repos:any[]}){
  return (
    <div>
      {repos.map(r=> (
        <div className='card' style={{marginBottom:12}} key={r.name}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{r.name}</div>
              <div style={{color:'var(--muted)',fontSize:'0.9rem'}}>{r.desc}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700}}>{r.status}</div>
              <div style={{color:'var(--muted)',fontSize:'0.9rem'}}>{r.lastCommit}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
