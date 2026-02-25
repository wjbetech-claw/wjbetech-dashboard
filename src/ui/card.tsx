import React from 'react'

export default function Card({ title, subtitle, children }: { title?: string; subtitle?: string; children?: React.ReactNode }){
  return (
    <section style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:12,padding:16,boxShadow:'0 1px 0 rgba(0,0,0,0.04)'}}>
      {title ? (
        <div style={{marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:16}}>{title}</div>
          {subtitle ? <div style={{opacity:0.7,fontSize:12,marginTop:4}}>{subtitle}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
