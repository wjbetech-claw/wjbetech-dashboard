import React from 'react'
import ToastsProvider from '../ui/Toasts'
import MainDashboard from './MainDashboard'

export default function DashboardPage(){
  return (
    <ToastsProvider>
      <MainDashboard />
    </ToastsProvider>
  )
}
