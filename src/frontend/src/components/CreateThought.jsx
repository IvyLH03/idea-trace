import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import { useState } from "react";
import { postThought } from "../scripts/api";

export default function CreateThought({refreshData}) {
  const [thoughtContent, setThoughtContent] = useState("")
  return (
    <Stack
      direction={"column"}
      spacing={2}
      maxWidth={500}
      justifySelf={"center"}
    >
      <TextField 
        id="outlined-basic" 
        label="Thought" 
        variant="outlined" 
        value={thoughtContent}
        onChange= {event => {
          setThoughtContent(event.target.value);
        }}/>
      <Button variant="outlined" onClick={() => {
        postThought(thoughtContent)
        .then(()=>{
          refreshData()
        })
      }}>Log</Button>
    </Stack>
  )
}