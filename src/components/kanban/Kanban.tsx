import React, { useEffect, useState } from 'react'

type Card = { id: string; title: string }

type Column = { id: string; title: string; cards: Card[] }

const STORAGE_KEY = 'wjb_kanban_v1'

export default function Kanban(){
  const [cols,setCols] = useState<Column[]>(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw)
    }catch(e){}
    return [
      {id:'todo', title:'To Do', cards:[{id:'c1',title:'Sample task'}]},
      {id:'doing', title:'Doing', cards:[]},
      {id:'done', title:'Done', cards:[]}
    ]
  })

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cols)) },[cols])

  function moveCard(fromCol:string, toCol:string, cardId:string){
    setCols(prev=>{
      const next = prev.map(c=>({...c, cards:[...c.cards]}))
      const src = next.find(c=>c.id===fromCol)
      const dst = next.find(c=>c.id===toCol)
      if(!src || !dst) return prev
      const idx = src.cards.findIndex(cd=>cd.id===cardId)
      if(idx===-1) return prev
      const [card] = src.cards.splice(idx,1)
      dst.cards.push(card)
      return next
    })
  }

  return (
    <div style={{display:'flex',gap:12}} data-testid="kanban-root">
      {cols.map(col=> (
        <div key={col.id} style={{flex:1,background:'var(--panel)',padding:12,borderRadius:8}}>
          <h3>{col.title}</h3>
          <ul>
            {col.cards.map(card=>(
              <li key={card.id} style={{padding:8,margin:'8px 0',background:'var(--bg)',borderRadius:6}}>
                <div>{card.title}</div>
                <div style={{marginTop:6}}>
                  {cols.filter(c=>c.id!==col.id).map(c=>(
                    <button key={c.id} className='cursor-pointer' onClick={()=>moveCard(col.id,c.id)} style={{marginRight:6}}>Move to {c.title}</button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
