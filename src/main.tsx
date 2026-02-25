<<<<<<< Updated upstream
import './styles/ui-enhance.css'
=======
import './styles/tokens.generated.css'
>>>>>>> Stashed changes
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>)
