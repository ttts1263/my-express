import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { myNoteRouter } from './myNote.js'

export const app = express()

dotenv.config()

// cors 설정
const allowList = ['http://localhost:5173']
function corsOptions(req, callback) {
  console.log('# corsOptions req.header("Origin")', req.header('Origin'))
  let options = { origin: false, credentials: true }
  if (allowList.includes(req.header('Origin'))) {
    options.origin = true
  }
  console.log('# corsOptions options', options)
  callback(null, options)
}
app.use(cors(corsOptions))
app.options('*', cors()) // enable pre-flight
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/my-note', myNoteRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
