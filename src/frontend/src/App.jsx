import { useEffect, useState } from 'react'
import IdeaTimeline from './components/IdeaTimeline'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CreateThought from './components/CreateThought'
import {getAllThoughts} from './scripts/api'

function App() {
  const [thoughts, setThoughts] = useState([])

  const refreshData = () => {
    getAllThoughts()
    .then(data => {
      setThoughts(data)
    })
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <Container>
      <IdeaTimeline thoughts={thoughts} refreshData={refreshData}/>
      <CreateThought refreshData={refreshData}/>
    </Container>
  )
}

export default App
