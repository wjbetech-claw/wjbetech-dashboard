import React, { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'

const THEME_KEY = 'wjb:theme'

export default function SettingsPage(){
  const [dark, setDark] = useState<boolean>(() => {
    try{ const v = localStorage.getItem(THEME_KEY); return v === 'dark' }
    catch(e){ return false }
  })

  useEffect(()=>{
    try{ localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light') }catch(e){}
    if (dark) document.documentElement.classList.add('theme-dark')
    else document.documentElement.classList.remove('theme-dark')
  },[dark])

  return (
    <div style={{padding:20}}>
      <h1 style={{fontSize:24}}>Settings</h1>
      <p>Manage theme, integrations, and notification preferences.</p>

      <div style={{marginTop:16}}>
        <label style={{display:'flex',alignItems:'center',gap:8}}>
          <span>Dark theme</span>
          <Switch checked={dark} onCheckedChange={(v:any)=> setDark(!!v)} />
        </label>
      </div>

      <div style={{marginTop:12}}>
        <h3>Integrations</h3>
        <p>Connect GitHub, Slack, and other services here.</p>
      </div>

      <div style={{marginTop:12}}>
        <h3>Notifications</h3>
        <p>Set preferences for email and in-app notifications.</p>
      </div>
    </div>
  )
}
