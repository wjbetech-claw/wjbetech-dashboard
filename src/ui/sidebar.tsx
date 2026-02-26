import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Board', to: '/board' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Repos', to: '/repos' },
  { label: 'Settings', to: '/settings' },
]

export default function Sidebar(){
  return (
    <aside style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:12,padding:16,height:'100%'}} aria-label="Primary navigation">
      <div style={{fontWeight:700,marginBottom:12}}>Workspace</div>
      <nav aria-label="Main">
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className='cursor-pointer'
              style={({ isActive }) => ({
                textDecoration:'none',
                color:'inherit',
                padding:'6px 8px',
                borderRadius:8,
                background: isActive ? 'var(--panel)' : 'transparent',
                border: isActive ? '1px solid var(--border)' : '1px solid transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div style={{marginTop:20}}>
        <div style={{fontWeight:600,marginBottom:8}}>Quick actions</div>
        <button className='cursor-pointer' style={{width:'100%',padding:'8px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>New deployment</button>
        <button className='cursor-pointer' style={{width:'100%',marginTop:8,padding:'8px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}>Sync repos</button>
      </div>
    </aside>
  )
}
