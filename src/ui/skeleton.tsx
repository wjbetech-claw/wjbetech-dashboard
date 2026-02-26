import * as React from 'react'

export function Skeleton({ width = '100%', height = 12 }: { width?: number | string; height?: number | string }){
  return (
    <div style={{width, height, borderRadius:8, background:'linear-gradient(90deg, rgba(148,163,184,0.15) 25%, rgba(148,163,184,0.3) 37%, rgba(148,163,184,0.15) 63%)', backgroundSize:'400% 100%', animation:'skeleton 1.4s ease infinite'}} />
  )
}
