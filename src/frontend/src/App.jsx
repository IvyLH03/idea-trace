import { useEffect, useState } from 'react'
import IdeaTimeline from './components/IdeaTimeline'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CreateThought from './components/CreateThought'

function App() {
  const [thoughts, setThoughts] = useState([])

  function getAllThoughts () {
    fetch('http://localhost:5500/thought/get/all')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setThoughts(data)
    })
  }

  useEffect(() => {
    getAllThoughts()
  }, [])

  const postThought = (content) => {
    fetch('http://localhost:5500/thought/post', {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: content
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      getAllThoughts()
    })

  }

  return (
    <Container>
      <IdeaTimeline thoughts={thoughts}/>
      <CreateThought postThought={postThought}/>
    </Container>
  )
}

export default App
