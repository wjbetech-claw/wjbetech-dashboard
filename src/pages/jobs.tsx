import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export default function JobsPage(){
  return (
    <div style={{padding:20}}>
      <h1 style={{fontSize:24,marginBottom:12}}>Jobs & Kanban</h1>
      <p style={{marginBottom:16}}>Kanban board scaffold for jobs. This is a lightweight UI scaffold — backend persistence to follow.</p>

      <div style={{display:'flex',gap:12}}>
        <Card style={{flex:1}}>
          <h3>To do</h3>
          <div style={{minHeight:200}}>placeholder</div>
        </Card>
        <Card style={{flex:1}}>
          <h3>In progress</h3>
          <div style={{minHeight:200}}>placeholder</div>
        </Card>
        <Card style={{flex:1}}>
          <h3>Done</h3>
          <div style={{minHeight:200}}>placeholder</div>
        </Card>
      </div>

      <div style={{marginTop:16}}>
        <Button>Create job</Button>
      </div>
    </div>
  )
}
