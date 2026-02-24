import React from 'react'

export default function JobListing({list}:{list:any[]}){
  return (
    <div className='card'>
      <h3 style={{margin:0}}>Job Listings</h3>
      <ul style={{marginTop:12}}>
        {list.map((j,i)=> (
          <li key={i} style={{marginBottom:10}}>
            <a className='cursor-pointer' href='#'>{j.title} — {j.company}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
