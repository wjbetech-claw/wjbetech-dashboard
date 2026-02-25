import React from 'react'
import OverviewStats from '../components/OverviewStats'
import RecentActivity from '../components/RecentActivity'
import PipelineOverview from '../components/PipelineOverview'
import EnvironmentsGrid from '../components/EnvironmentsGrid'
import AlertsPanel from '../components/AlertsPanel'

export default function MainDashboard(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <OverviewStats />
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:16}}>
        <PipelineOverview />
        <RecentActivity />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:16}}>
        <EnvironmentsGrid />
        <AlertsPanel />
      </div>
    </div>
  )
}
