import React from 'react'

export default function Card({ title, subtitle, children, className }: { title?: string; subtitle?: string; children?: React.ReactNode; className?: string }){
  return (
    <section className={className} style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:14,padding:16,boxShadow:'0 10px 30px rgba(15,23,42,0.06)'}}>
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
