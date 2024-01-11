import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { myNoteRouter } from './myNote.js'

export const app = express()

app.use(bodyParser.json())

app.use(
  cors({
    origin: 'http://localhost:5173', // FrontEnd
  })
)

app.use('/my-note', myNoteRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
