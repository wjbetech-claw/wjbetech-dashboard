import React, { useEffect, useState, Suspense, lazy } from 'react'
const OverviewStats = lazy(() => import('../components/OverviewStats'))
const RecentActivity = lazy(() => import('../components/RecentActivity'))
const PipelineOverview = lazy(() => import('../components/PipelineOverview'))
const EnvironmentsGrid = lazy(() => import('../components/EnvironmentsGrid'))
const AlertsPanel = lazy(() => import('../components/AlertsPanel'))
import Card from '../ui/card'
import { ErrorBanner } from '../ui/error-banner'
import { Skeleton } from '../ui/skeleton'
import { EmptyState } from '../ui/empty-state'
import '../styles/dashboard.css'
import { getOverview } from '../services/api'

export default function MainDashboard(){
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [overview, setOverview] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    getOverview()
      .then((data) => { if(mounted) setOverview(data) })
      .catch((err) => { if(mounted) setError(err.message || 'Failed to load') })
      .finally(() => { if(mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div className='dashboard-root'>
      <section className='dashboard-hero dashboard-fade-in'>
        <div className='dashboard-hero-title'>Welcome back, Valruna 👋</div>
        <div className='dashboard-hero-subtitle'>Here’s a fast, friendly snapshot of systems, pipelines, and job progress.</div>
        <div className='dashboard-quick-actions'>
          <button className='cursor-pointer dashboard-quick-action'>⚡ Run pipeline</button>
          <button className='cursor-pointer dashboard-quick-action'>🧭 View board</button>
          <button className='cursor-pointer dashboard-quick-action'>📌 Pin repo</button>
          <button className='cursor-pointer dashboard-quick-action'>🔍 Search jobs</button>
        </div>
      </section>

      {loading && <Card title='Loading' subtitle='Fetching overview data…'><Skeleton height={14} /><div style={{height:8}} /><Skeleton height={14} /></Card>}
      {error && <ErrorBanner message={error} />}

      <div className='dashboard-grid dashboard-grid-3 dashboard-fade-in'>
        <Card title='System health' subtitle='Live snapshot' >
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{fontSize:28}}>🟢</div>
            <div>
              <div style={{fontWeight:700,fontSize:18}}>{overview?.systemHealth?.message || 'All systems operational'}</div>
              <div style={{fontSize:12,opacity:0.7}}>Next check in 4 minutes</div>
            </div>
          </div>
        </Card>
        <Card title='Deployments' subtitle='Last 24 hours'>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{fontSize:28}}>🚀</div>
            <div>
              <div style={{fontWeight:700,fontSize:18}}>{overview?.deployments?.completed24h ?? 18} completed</div>
              <div style={{fontSize:12,opacity:0.7}}>{overview?.deployments?.inProgress ?? 2} in progress</div>
            </div>
          </div>
        </Card>
        <Card title='Focus' subtitle='Active objective'>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{fontSize:28}}>🎯</div>
            <div>
              <div style={{fontWeight:700,fontSize:18}}>{overview?.activeFocus?.title || 'Polish dashboard UI'}</div>
              <div style={{fontSize:12,opacity:0.7}}>ETA: {overview?.activeFocus?.eta || 'Today'}</div>
            </div>
          </div>
        </Card>
      </div>

      <Suspense fallback={<div>Loading…</div>}>
        <div className='dashboard-fade-in'>
          <OverviewStats />
        </div>
      </Suspense>

      <Suspense fallback={<div>Loading…</div>}>
        <div className='dashboard-grid dashboard-grid-2 dashboard-fade-in'>
          <PipelineOverview />
          <RecentActivity />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading…</div>}>
        <div className='dashboard-grid dashboard-grid-2 dashboard-fade-in'>
          <EnvironmentsGrid />
          <AlertsPanel />
        </div>
      </Suspense>

      <div className='dashboard-grid dashboard-grid-2 dashboard-fade-in'>
        <Card title='Highlights' subtitle='Friendly insights'>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {(['✅ CI success rate up 0.6% this week','✨ New UI polish PR ready for review','🧩 3 repos need dependency upgrades'].length === 0) ? (
            <EmptyState title='No highlights' message='No updates yet.' />
          ) : [
              '✅ CI success rate up 0.6% this week',
              '✨ New UI polish PR ready for review',
              '🧩 3 repos need dependency upgrades',
            ].map((item) => (
              <div key={item} style={{display:'flex',gap:10,alignItems:'center',borderBottom:'1px solid var(--border)',paddingBottom:8}}>
                <span style={{fontSize:18}}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title='Team pulse' subtitle='People and momentum'>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:12}}>
            {['Ari', 'Devon', 'Kai', 'Mina'].map((name) => (
              <div key={name} style={{border:'1px solid var(--border)',borderRadius:12,padding:12,display:'flex',flexDirection:'column',gap:6}}>
                <div style={{fontSize:22}}>🙂</div>
                <div style={{fontWeight:600}}>{name}</div>
                <div style={{fontSize:12,opacity:0.7}}>Active now</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
