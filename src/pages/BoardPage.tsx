import React from 'react'
import Card from '../ui/card'

const columns = [
  { title: 'Backlog', items: ['Edge worker cleanup', 'Refactor auth flow', 'Add job tags'] },
  { title: 'In Progress', items: ['Dashboard UI polish', 'CI stabilization'] },
  { title: 'Review', items: ['Design tokens audit'] },
  { title: 'Done', items: ['Navbar links', 'Router setup'] },
]

export default function BoardPage(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Board' subtitle='Visualize priorities'>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
          {columns.map((col) => (
            <div key={col.title} style={{border:'1px solid var(--border)',borderRadius:12,padding:12,background:'var(--panel)'}}>
              <div style={{fontWeight:700,marginBottom:8}}>{col.title}</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {col.items.map((item) => (
                  <div key={item} style={{padding:'8px 10px',border:'1px solid var(--border)',borderRadius:10,background:'var(--panel)'}}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
