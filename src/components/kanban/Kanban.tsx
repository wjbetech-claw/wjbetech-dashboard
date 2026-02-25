import React, { useEffect, useMemo, useState } from 'react'

type Card = { id: string; title: string; description?: string }

type Column = { id: string; title: string; cards: Card[] }

const STORAGE_KEY = 'wjb_kanban_v2'

export default function Kanban(){
  const [cols,setCols] = useState<Column[]>(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw)
    }catch(e){}
    return [
      {id:'todo', title:'Backlog', cards:[{id:'c1',title:'Design dashboard polish',description:'Refine spacing + cards'}]},
      {id:'doing', title:'In Progress', cards:[{id:'c2',title:'CI workflow tweaks',description:'Ensure tests are green'}]},
      {id:'review', title:'Review', cards:[]},
      {id:'done', title:'Done', cards:[{id:'c3',title:'Navbar links',description:'Board/Jobs links'}]}
    ]
  })

  const [drafts,setDrafts] = useState<Record<string,string>>({})

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cols)) },[cols])

  function moveCard(fromCol:string, toCol:string, cardId:string){
    if(fromCol === toCol) return
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

  function addCard(colId:string){
    const title = (drafts[colId] || '').trim()
    if(!title) return
    setCols(prev=>{
      const next = prev.map(c=>({...c, cards:[...c.cards]}))
      const dst = next.find(c=>c.id===colId)
      if(!dst) return prev
      dst.cards.unshift({ id: `c_${Date.now()}`, title })
      return next
    })
    setDrafts(d=>({...d, [colId]:''}))
  }

  const columnIds = useMemo(()=>cols.map(c=>c.id),[cols])

  function onDragStart(e:React.DragEvent, fromCol:string, cardId:string){
    e.dataTransfer.setData('text/plain', JSON.stringify({fromCol, cardId}))
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDrop(e:React.DragEvent, toCol:string){
    e.preventDefault()
    try{
      const data = JSON.parse(e.dataTransfer.getData('text/plain'))
      if(data?.fromCol && data?.cardId){
        moveCard(data.fromCol, toCol, data.cardId)
      }
    }catch(err){}
  }

  function allowDrop(e:React.DragEvent){
    e.preventDefault()
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14}} data-testid="kanban-root">
      {cols.map(col=> (
        <div key={col.id} style={{background:'var(--panel)',padding:12,borderRadius:12,border:'1px solid var(--border)'}} onDragOver={allowDrop} onDrop={(e)=>onDrop(e,col.id)}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <h3 style={{margin:0,fontSize:14,letterSpacing:'0.4px'}}>{col.title}</h3>
            <span style={{fontSize:12,opacity:0.7}}>{col.cards.length}</span>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:10}}>
            <input
              value={drafts[col.id] || ''}
              onChange={(e)=>setDrafts(d=>({...d,[col.id]:e.target.value}))}
              placeholder='Add a task'
              style={{flex:1,padding:'6px 8px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}
            />
            <button className='cursor-pointer' onClick={()=>addCard(col.id)} style={{padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Add</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10,minHeight:60}}>
            {col.cards.map(card=>(
              <div
                key={card.id}
                draggable
                onDragStart={(e)=>onDragStart(e,col.id,card.id)}
                style={{padding:10,background:'var(--bg)',borderRadius:10,border:'1px solid var(--border)',cursor:'grab'}}
              >
                <div style={{fontWeight:600}}>{card.title}</div>
                {card.description ? <div style={{fontSize:12,opacity:0.7,marginTop:4}}>{card.description}</div> : null}
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>
                  {columnIds.filter(id=>id!==col.id).map(id=>(
                    <button key={id} className='cursor-pointer' onClick={()=>moveCard(col.id,id,card.id)} style={{fontSize:11,padding:'4px 6px',border:'1px solid var(--border)',borderRadius:6,background:'transparent'}}>Move</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
