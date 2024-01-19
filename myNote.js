import { Router } from 'express'
import { OAuth2Client } from 'google-auth-library'
import jsonwebtoken from 'jsonwebtoken'

export const myNoteRouter = Router()

myNoteRouter.post('/jwt', async (req, res) => {
  const jwt = req.body.jwt

  // jwt 검증
  const client = new OAuth2Client()
  const verified = await client.verifyIdToken({
    idToken: jwt,
  })
  const payload = verified.getPayload()

  // 세션 생성
  const userData = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  }
  const session = jsonwebtoken.sign(userData, process.env.JWT_SECRET) // HS256

  // 프론트 쿠키 전송
  res.cookie('my-note-session', session, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1년
    // httpOnly: true, // 백엔드에서만 쿠키 조작 가능
    sameSite: 'none', // cors 에서도 쿠키 전송 가능
    // secure: true, // https 에서만 동작
  })

  res.send({ session, userData })
})

// 구글로그인 > 유저정보(credential - JWT) > 백엔드로 보내기 >
// 백엔드에서 credential 검증 > 프론트에서 보낸 jwt 유효한지 파악 >
// 구글이 검증해줘야함. > google-auth-library 설치 > 검증

myNoteRouter.get('/sessionCheck', (req, res) => {
  const session = req.cookies['my-note-session']
  if (!session) return res.send({ session: false })

  try {
    const userData = jsonwebtoken.verify(session, process.env.JWT_SECRET)
    res.send({ session: true, userData })
  } catch (e) {
    res.send({ session: false })
  }
})
