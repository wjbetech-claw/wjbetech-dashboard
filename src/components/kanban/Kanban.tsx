import React, { useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Card = { id: string; title: string; description?: string }

type Column = { id: string; title: string; cards: Card[]; color: string; icon: string }

const STORAGE_KEY = 'wjb_kanban_v4'

const DEFAULT_COLS: Column[] = [
  {id:'todo', title:'Backlog', color:'#EEF2FF', icon:'🧠', cards:[{id:'c1',title:'Design dashboard polish',description:'Refine spacing + cards'}]},
  {id:'doing', title:'In Progress', color:'#ECFEFF', icon:'⚙️', cards:[{id:'c2',title:'CI workflow tweaks',description:'Ensure tests are green'}]},
  {id:'review', title:'Review', color:'#FFF7ED', icon:'🔍', cards:[]},
  {id:'done', title:'Done', color:'#ECFDF5', icon:'✅', cards:[{id:'c3',title:'Navbar links',description:'Board/Jobs links'}]},
]

function KanbanCard({ card, isDragging, onDelete }: { card: Card; isDragging?: boolean; onDelete?: () => void }){
  return (
    <div
      style={{
        padding:12,
        background:'var(--panel)',
        borderRadius:12,
        border:'1px solid var(--border)',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow:'0 6px 16px rgba(15,23,42,0.08)',
        opacity: isDragging ? 0.7 : 1,
      }}
    >
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <div style={{fontWeight:600}}>{card.title}</div>
        <button className='cursor-pointer' onClick={onDelete} style={{border:'1px solid var(--border)',borderRadius:8,background:'transparent',padding:'2px 6px',fontSize:12}}>🗑️</button>
      </div>
      {card.description ? <div style={{fontSize:12,opacity:0.7,marginTop:4}}>{card.description}</div> : null}
    </div>
  )
}

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

  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  useEffect(() => {
    if(!isOpen) return
    function onKey(e: KeyboardEvent){
      if(e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  function persist(next: Column[]){
    setCols(next)
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }catch(e){}
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

  function deleteCard(colId:string, cardId:string){
    const next = cols.map(c=>({...c, cards:[...c.cards]}))
    const dst = next.find(c=>c.id===colId)
    if(!dst) return
    dst.cards = dst.cards.filter(c=>c.id!==cardId)
    persist(next)
  }

  const columnIds = useMemo(()=>cols.map(c=>c.id),[cols])

  function findCard(cardId: string){
    for (const col of cols) {
      const card = col.cards.find(c=>c.id===cardId)
      if(card) return { card, col }
    }
    return null
  }

  function onDragStart(event: any){
    const cardId = event.active.id as string
    const found = findCard(cardId)
    if(found) setActiveCard(found.card)
  }

  function onDragEnd(event: any){
    const { active, over } = event
    setActiveCard(null)
    if(!over) return
    const activeId = active.id as string
    const overId = over.id as string

    const from = findCard(activeId)
    if(!from) return

    if(columnIds.includes(overId)){
      const next = cols.map(c=>({...c, cards:[...c.cards]}))
      const src = next.find(c=>c.id===from.col.id)
      const dst = next.find(c=>c.id===overId)
      if(!src || !dst) return
      src.cards = src.cards.filter(c=>c.id!==activeId)
      dst.cards.push(from.card)
      persist(next)
      return
    }

    const target = findCard(overId)
    if(!target) return

    const next = cols.map(c=>({...c, cards:[...c.cards]}))
    const src = next.find(c=>c.id===from.col.id)
    const dst = next.find(c=>c.id===target.col.id)
    if(!src || !dst) return

    src.cards = src.cards.filter(c=>c.id!==activeId)

    const targetIndex = dst.cards.findIndex(c=>c.id===overId)
    if(targetIndex === -1) return

    dst.cards.splice(targetIndex, 0, from.card)
    persist(next)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontWeight:700,display:'flex',alignItems:'center',gap:8}}>🗂️ Kanban board</div>
        <button className='cursor-pointer' onClick={()=>setIsOpen(true)} style={{padding:'8px 12px',border:'1px solid var(--border)',borderRadius:10,background:'var(--panel)'}}>+ Add task</button>
      </div>

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14}} data-testid="kanban-root">
          {cols.map(col=> (
            <KanbanColumn key={col.id} col={col}>
              <SortableContext items={col.cards.map(c=>c.id)} strategy={verticalListSortingStrategy}>
                <div style={{display:'flex',flexDirection:'column',gap:10,minHeight:80}}>
                  {col.cards.map(card=> (
                    <SortableCard key={card.id} id={card.id} card={card} colId={col.id} onDelete={deleteCard} />
                  ))}
                </div>
              </SortableContext>
            </KanbanColumn>
          ))}
        </div>
        <DragOverlay>
          {activeCard ? <KanbanCard card={activeCard} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      {isOpen ? (
        <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}} role="dialog" aria-modal="true" aria-label="Add new task">
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

function SortableCard({ id, card, colId, onDelete }: { id: string; card: Card; colId: string; onDelete: (colId:string, cardId:string)=>void }){
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties

  return (
    <div ref={setNodeRef} style={{...style, opacity: isDragging ? 0.2 : 1}} {...attributes} {...listeners}>
      <KanbanCard card={card} isDragging={isDragging} onDelete={()=>onDelete(colId, card.id)} />
    </div>
  )
}

function KanbanColumn({ col, children }: { col: Column; children?: React.ReactNode }){
  const { setNodeRef } = useDroppable({ id: col.id })
  return (
    <div ref={setNodeRef} style={{background:col.color,padding:12,borderRadius:14,border:'1px solid var(--border)',boxShadow:'0 10px 24px rgba(15,23,42,0.06)'}} id={col.id}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <h3 style={{margin:0,fontSize:14,letterSpacing:'0.4px',display:'flex',alignItems:'center',gap:6}}>{col.icon} {col.title}</h3>
        <span style={{fontSize:12,opacity:0.7}}>{col.cards.length}</span>
      </div>
      {children}
    </div>
  )
}
