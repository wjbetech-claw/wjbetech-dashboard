import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from './ui/page-layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import OfflineBanner from './components/OfflineBanner'
import { useOnlineStatus } from './hooks/useOnlineStatus'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const BoardPage = lazy(() => import('./pages/BoardPage'))
const JobsPage = lazy(() => import('./pages/JobsPage'))
const ReposPage = lazy(() => import('./pages/ReposPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

export default function App(){
  const online = useOnlineStatus()
  return (
    <PageLayout>
      <ErrorBoundary>

      {!online && <OfflineBanner />}

      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path='/' element={<DashboardPage/>} />
          <Route path='/board' element={<BoardPage/>} />
          <Route path='/jobs' element={<JobsPage/>} />
          <Route path='/repos' element={<ReposPage/>} />
          <Route path='/settings' element={<SettingsPage/>} />
        </Routes>
      </Suspense>
          </ErrorBoundary>
    </PageLayout>
  )
}
