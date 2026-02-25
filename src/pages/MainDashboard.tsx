import React from 'react'
import Sidebar from '../ui/sidebar'
import OverviewStats from '../components/OverviewStats'
import RecentActivity from '../components/RecentActivity'
import PipelineOverview from '../components/PipelineOverview'
import EnvironmentsGrid from '../components/EnvironmentsGrid'
import AlertsPanel from '../components/AlertsPanel'

export default function MainDashboard(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:16,padding:16}}>
      <Sidebar />
      <main style={{display:'flex',flexDirection:'column',gap:16}}>
        <OverviewStats />
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:16}}>
          <PipelineOverview />
          <RecentActivity />
        </div>
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:16}}>
          <EnvironmentsGrid />
          <AlertsPanel />
        </div>
      </main>
    </div>
  )
}
