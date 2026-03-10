import React from 'react'
import ThemeToggler from '../ThemeToggler'
import SubNav from './SubNav'

export default function Header(){
  return (
    <>
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto px-4" style={{maxWidth:980}}>
        <nav className="flex items-center justify-between h-16">
          <div className="text-xl font-semibold">Colorwaves</div>
          <div className="flex items-center gap-2">
            <ThemeToggler />
          </div>
        </nav>
      </div>
    </header>
    <SubNav />
    </>
  )
}
