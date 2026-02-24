import React, {useEffect, useState} from 'react'
export default function ThemeSwitcher(){
  const [theme,setTheme] = useState(() => (typeof window !== 'undefined' && (localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))));
  useEffect(()=>{ if(!theme) return; document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); },[theme]);
  return <button onClick={()=>setTheme(t=> t==='dark'?'light':'dark')} style={{padding:'6px 10px',borderRadius:'8px',background:'transparent',border:'1px solid var(--border)'}}>{theme==='dark'?'🌙 Dark':'☀️ Light'}</button>
}
