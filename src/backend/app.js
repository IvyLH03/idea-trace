import express from 'express'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

const app = express()
const port = 6000

app.use(express.json())

const db = await open({
  filename: "./db.db",
  driver: sqlite3.Database
});

const INSERT_THOUGHT_SQL = "INSERT INTO thought(content, created_at) VALUES (?, ?) RETURNING thought_id"
const GET_THOUGHT_ALL_SQL = "SELECT * FROM thought"
const GET_MOST_RECENT_THOUGHT = "SELECT * " +
  "FROM thought " +
  "ORDER BY created_at DESC " +
  "LIMIT 1"


await db.exec("CREATE TABLE IF NOT EXISTS thought("+
  "thought_id INTEGER PRIMARY KEY UNIQUE, " +
  "content TEXT NOT NULL, " +
  "created_at INTEGER NOT NULL" + 
  ");")

app.get('/thought/get/all', async (req, res) =>{
  try{
    const result = await db.all(GET_THOUGHT_ALL_SQL)
    res.status(200).send(result)
  } catch(e) {
    console.error(e)
    res.status(500).send({msg:"server error"})
  }
})

app.get('/thought/get/recent', async (req, res) =>{
  try{
    const result = await db.get(GET_MOST_RECENT_THOUGHT)
    res.status(200).send(result)
  } catch(e) {
    console.error(e)
    res.status(500).send({msg:"server error"})
  }
})

app.post('/thought/post', async (req, res) => {
  try{
    const created_at = Math.floor(Date.now() / 1000)
    console.log(req.body.content)
    const result = await db.get(INSERT_THOUGHT_SQL, req.body.content, created_at)
    res.status(200).send(result)
  } catch(e) {
    console.error(e)
    res.status(500).send({msg:"server error"})
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})