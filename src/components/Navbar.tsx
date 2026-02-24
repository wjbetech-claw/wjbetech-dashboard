import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar(){
  return (
    <header className='w-full' style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',background:'var(--panel)',borderBottom:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontWeight:700}}>wjbetech-dashboard</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
