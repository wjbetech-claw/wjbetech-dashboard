import React from 'react'

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }>{
  constructor(props: { children: React.ReactNode }){
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(){
    return { hasError: true }
  }

  render(){
    if(this.state.hasError){
      return <div style={{padding:16,border:'1px solid var(--color-error)',borderRadius:10,background:'rgba(239,68,68,0.08)'}}>Something went wrong.</div>
    }
    return this.props.children
  }
}
