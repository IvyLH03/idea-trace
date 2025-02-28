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
  // const base_url = "http://localhost:5500"
  const base_url = "https://trace.ivylh03.net"


  function getAllThoughts () {
    fetch(base_url + '/thought/get/all')
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
    fetch(base_url + '/thought/post', {
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
