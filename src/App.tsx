import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Landing from './components/Landing'

export default function App(){
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <main>
        <Landing />
      </main>
      <Footer />
    </div>
  )
}
