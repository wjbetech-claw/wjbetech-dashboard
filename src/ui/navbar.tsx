import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeSwitcher from './theme-switcher'
import { Button } from './button'

export default function Navbar(){
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',background:'var(--panel)',borderBottom:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link to="/" style={{fontWeight:700,color:'inherit',textDecoration:'none'}} aria-label="Home">
          wjbetech-dashboard
        </Link>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <Button asChild variant="ghost">
          <NavLink to="/board" className="cursor-pointer" style={{textDecoration:'none'}}>
            Board
          </NavLink>
        </Button>
        <Button asChild variant="ghost">
          <NavLink to="/jobs" className="cursor-pointer" style={{textDecoration:'none'}}>
            Jobs
          </NavLink>
        </Button>
        <ThemeSwitcher/>
      </div>
    </header>
  )
}
