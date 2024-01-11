import express from 'express'
import cors from 'cors'
import { myNoteRouter } from './myNote.js'

export const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // FrontEnd
  })
)

app.use('/my-note', myNoteRouter)

// RESTful api 메소드 추가 (get(조회), post(생성), put(덮어쓰기), patch(업데이트), delete(삭제))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('This is about page!')
})

app.post('/post', (req, res) => {
  const newPostId = 1
  res.send({ id: newPostId })
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // DB에서 email 과 password가 일치하는지 체크
  // 일치하지 않으면 401 Unauthorized
  // 일치하면 200 OK와 사용자 정보를 응답
})

app.post('/my-note/jwt', (req, res) => {
  console.log(req.body)
  res.send('jwt 저장 완료')
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
