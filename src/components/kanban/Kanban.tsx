import React, { useMemo, useState } from 'react'

type Card = { id: string; title: string; description?: string }

type Column = { id: string; title: string; cards: Card[]; color: string; icon: string }

const STORAGE_KEY = 'wjb_kanban_v3'

const DEFAULT_COLS: Column[] = [
  {id:'todo', title:'Backlog', color:'#EEF2FF', icon:'🧠', cards:[{id:'c1',title:'Design dashboard polish',description:'Refine spacing + cards'}]},
  {id:'doing', title:'In Progress', color:'#ECFEFF', icon:'⚙️', cards:[{id:'c2',title:'CI workflow tweaks',description:'Ensure tests are green'}]},
  {id:'review', title:'Review', color:'#FFF7ED', icon:'🔍', cards:[]},
  {id:'done', title:'Done', color:'#ECFDF5', icon:'✅', cards:[{id:'c3',title:'Navbar links',description:'Board/Jobs links'}]},
]

export default function Kanban(){
  const [cols,setCols] = useState<Column[]>(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw)
    }catch(e){}
    return DEFAULT_COLS
  })

  const [isOpen,setIsOpen] = useState(false)
  const [draftTitle,setDraftTitle] = useState('')
  const [draftDesc,setDraftDesc] = useState('')
  const [draftCol,setDraftCol] = useState(cols[0]?.id || 'todo')

  function persist(next: Column[]){
    setCols(next)
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }catch(e){}
  }

  function moveCard(fromCol:string, toCol:string, cardId:string){
    if(fromCol === toCol) return
    const next = cols.map(c=>({...c, cards:[...c.cards]}))
    const src = next.find(c=>c.id===fromCol)
    const dst = next.find(c=>c.id===toCol)
    if(!src || !dst) return
    const idx = src.cards.findIndex(cd=>cd.id===cardId)
    if(idx===-1) return
    const [card] = src.cards.splice(idx,1)
    dst.cards.push(card)
    persist(next)
  }

  function addCard(){
    const title = draftTitle.trim()
    if(!title) return
    const next = cols.map(c=>({...c, cards:[...c.cards]}))
    const dst = next.find(c=>c.id===draftCol)
    if(!dst) return
    dst.cards.unshift({ id: `c_${Date.now()}`, title, description: draftDesc.trim() || undefined })
    persist(next)
    setDraftTitle('')
    setDraftDesc('')
    setIsOpen(false)
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
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontWeight:700,display:'flex',alignItems:'center',gap:8}}>🗂️ Kanban board</div>
        <button className='cursor-pointer' onClick={()=>setIsOpen(true)} style={{padding:'8px 12px',border:'1px solid var(--border)',borderRadius:10,background:'var(--panel)'}}>+ Add task</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14}} data-testid="kanban-root">
        {cols.map(col=> (
          <div key={col.id} style={{background:col.color,padding:12,borderRadius:14,border:'1px solid var(--border)',boxShadow:'0 10px 24px rgba(15,23,42,0.06)'}} onDragOver={allowDrop} onDrop={(e)=>onDrop(e,col.id)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <h3 style={{margin:0,fontSize:14,letterSpacing:'0.4px',display:'flex',alignItems:'center',gap:6}}>{col.icon} {col.title}</h3>
              <span style={{fontSize:12,opacity:0.7}}>{col.cards.length}</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10,minHeight:80}}>
              {col.cards.map(card=> (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e)=>onDragStart(e,col.id,card.id)}
                  style={{padding:12,background:'var(--panel)',borderRadius:12,border:'1px solid var(--border)',cursor:'grab',boxShadow:'0 6px 16px rgba(15,23,42,0.08)'}}
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

      {isOpen ? (
        <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}}>
          <div style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:16,padding:20,width:'min(520px,90vw)',boxShadow:'0 20px 40px rgba(15,23,42,0.25)'}}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:6}}>Add new task</div>
            <div style={{fontSize:12,opacity:0.7,marginBottom:12}}>Choose a list and add details.</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <input
                value={draftTitle}
                onChange={(e)=>setDraftTitle(e.target.value)}
                placeholder='Task title'
                style={{padding:'8px 10px',border:'1px solid var(--border)',borderRadius:10,background:'transparent'}}
              />
              <textarea
                value={draftDesc}
                onChange={(e)=>setDraftDesc(e.target.value)}
                placeholder='Description (optional)'
                rows={3}
                style={{padding:'8px 10px',border:'1px solid var(--border)',borderRadius:10,background:'transparent'}}
              />
              <select
                value={draftCol}
                onChange={(e)=>setDraftCol(e.target.value)}
                style={{padding:'8px 10px',border:'1px solid var(--border)',borderRadius:10,background:'transparent'}}
              >
                {cols.map(c=>(<option key={c.id} value={c.id}>{c.title}</option>))}
              </select>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:16}}>
              <button className='cursor-pointer' onClick={()=>setIsOpen(false)} style={{padding:'8px 12px',border:'1px solid var(--border)',borderRadius:10,background:'transparent'}}>Cancel</button>
              <button className='cursor-pointer' onClick={addCard} style={{padding:'8px 12px',border:'1px solid var(--border)',borderRadius:10,background:'var(--panel)'}}>Add task</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
