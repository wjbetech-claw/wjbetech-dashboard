import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeSwitcher from './theme-switcher'
export default function Navbar(){
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',background:'var(--panel)',borderBottom:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontWeight:700}}>wjbetech-dashboard</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <NavLink to="/board" className="cursor-pointer" style={{marginRight:8}}>Board</NavLink>
        <NavLink to="/jobs" className="cursor-pointer" style={{marginRight:8}}>Jobs</NavLink>
        <ThemeSwitcher/>
      </div>
    </header>
  )
}
