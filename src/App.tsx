import React from 'react'
import Navbar from './ui/navbar'
// Use MainDashboard as the app's main page
import MainDashboard from './pages/MainDashboard'
import './styles/tokens.generated.css'

export default function App(){
  return (
    <div>
      <Navbar />
      <MainDashboard />
    </div>
  )
}
