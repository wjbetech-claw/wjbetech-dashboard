import React from 'react'
import Card from '../ui/card'
import Kanban from '../components/kanban/Kanban'

export default function BoardPage(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Card title='Board' subtitle='Visualize priorities and move work across stages'>
        <Kanban />
      </Card>
    </div>
  )
}
