import { useEffect, useState } from 'react'
import IdeaTimeline from './components/IdeaTimeline'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function App() {
  const [thoughts, setThoughts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5500/thought/get/all')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setThoughts(data)
    })
  }, [])

  return (
    <Container>
      <IdeaTimeline thoughts={thoughts}/>
      <Typography>Time</Typography>
    </Container>
  )
}

export default App
