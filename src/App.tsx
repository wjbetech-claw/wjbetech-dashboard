import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from './ui/page-layout'
import OverviewPage from './pages/OverviewPage'
import BoardPage from './pages/BoardPage'
import JobsPage from './pages/JobsPage'
import ReposPage from './pages/ReposPage'
import SettingsPage from './pages/SettingsPage'

export default function App(){
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<OverviewPage/>} />
        <Route path='/board' element={<BoardPage/>} />
        <Route path='/jobs' element={<JobsPage/>} />
        <Route path='/repos' element={<ReposPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
      </Routes>
    </PageLayout>
  )
}
