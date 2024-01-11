import { Router } from 'express'

export const myNoteRouter = Router()

myNoteRouter.post('/jwt', (req, res) => {
  console.log(req.body)
  res.send('jwt 저장 완료')
})
