import React, {useEffect, useState} from 'react'

const THEMES = [
  'light','dark','cupcake','bumblebee','emerald','corporate','synthwave','retro','cyberpunk','valentine','halloween','garden','forest','aqua','lofi','pastel','fantasy','wireframe','black','luxury','dracula'
] as const

type Theme = (typeof THEMES)[number]

function getStored(): Theme | null {
  try { const t = localStorage.getItem('cw:theme'); return (t as Theme) || null } catch { return null }
}

function prefers(): Theme | null {
  try{
    if(typeof window === 'undefined') return null
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return dark ? 'dark' : 'light'
  }catch{ return null }
}

export default function ThemeToggler(){
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if(typeof window === 'undefined') return 'light'
    return (getStored() || prefers() || 'light') as Theme
  })

  useEffect(()=>{
    try{
      document.documentElement.setAttribute('data-theme', currentTheme)
      localStorage.setItem('cw:theme', currentTheme)
    }catch{}
  },[currentTheme])

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost" aria-label="Theme chooser">Theme</label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-72 overflow-auto flex flex-col">
        {THEMES.map((t) => {
          const cls = 'w-full text-left ' + (t === currentTheme ? 'font-semibold' : '')
          return (
            <li key={t} className="w-full">
              <button type="button" className={cls} onMouseDown={(e) => { e.preventDefault(); setCurrentTheme(t); }}>
                {t}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
