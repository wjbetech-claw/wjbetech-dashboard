import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import SkipLink from '../components/SkipLink'

export default function PageLayout({ children }: { children: React.ReactNode }){
  return (
    <div style={{minHeight:'100vh',background:'var(--color-surface)'}}>
      <SkipLink />
      <Navbar />
      <div className="layout-shell container-max">
        <aside className="sidebar bg-level-1 border-subtle">
          
        <Sidebar />
        </aside>
        <main id='main-content' className="content" style={{display:'flex',flexDirection:'column',gap:16}}>
          {children}
        </main>
      </div>
    </div>
  )
}
