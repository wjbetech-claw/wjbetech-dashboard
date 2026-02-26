import React, { useEffect, useState } from 'react'
import Card from '../ui/card'
import { Badge } from '../ui/badge'

const STORAGE_KEY = 'wjb_settings_v1'

type SettingsState = {
  theme: 'light' | 'dark'
  notifications: {
    email: boolean
    slack: boolean
    inApp: boolean
  }
}

export default function SettingsPage(){
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'dark',
    notifications: { email: true, slack: false, inApp: true },
  })

  useEffect(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) setSettings(JSON.parse(raw))
    }catch(e){}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    document.documentElement.setAttribute('data-theme', settings.theme)
  }, [settings])

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Settings' subtitle='Manage integrations & preferences'>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
            <div>
              <div style={{fontWeight:600}}>Theme</div>
              <div style={{fontSize:12,opacity:0.7}}>Light / dark mode</div>
            </div>
            <select
              value={settings.theme}
              onChange={(e)=>setSettings(s=>({...s, theme: e.target.value as 'light'|'dark'}))}
              style={{padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'transparent'}}
            >
              <option value='dark'>Dark</option>
              <option value='light'>Light</option>
            </select>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
            <div>
              <div style={{fontWeight:600}}>GitHub</div>
              <div style={{fontSize:12,opacity:0.7}}>wjbetech-claw</div>
            </div>
            <Badge variant='success'>Connected</Badge>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
            <div>
              <div style={{fontWeight:600}}>Vercel</div>
              <div style={{fontSize:12,opacity:0.7}}>Deploy status</div>
            </div>
            <Badge variant='warning'>Needs auth</Badge>
          </div>
        </div>
      </Card>

      <Card title='Notifications' subtitle='How you receive updates'>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {([
            ['email','Email summaries'],
            ['slack','Slack alerts'],
            ['inApp','In‑app pings'],
          ] as const).map(([key, label]) => (
            <label key={key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
              <span>{label}</span>
              <input
                type='checkbox'
                checked={settings.notifications[key]}
                onChange={(e)=>setSettings(s=>({...s, notifications: {...s.notifications, [key]: e.target.checked}}))}
              />
            </label>
          ))}
        </div>
      </Card>
    </div>
  )
}
