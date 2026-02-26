import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import SkipLink from '../components/SkipLink'

export default function PageLayout({ children }: { children: React.ReactNode }){
  return (
    <div style={{minHeight:'100vh',background:'var(--bg)'}}>
      <SkipLink />
      <Navbar />
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:16,padding:16}}>
        <Sidebar />
        <main id='main-content' style={{display:'flex',flexDirection:'column',gap:16}}>
          {children}
        </main>
      </div>
    </div>
  )
}
