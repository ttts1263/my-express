import { Router } from 'express'
import { OAuth2Client } from 'google-auth-library'

export const myNoteRouter = Router()

myNoteRouter.post('/jwt', async (req, res) => {
  console.log(req.body)
  const jwt = req.body.jwt

  // jwt 검증
  const client = new OAuth2Client()
  const verified = await client.verifyIdToken({
    idToken: jwt,
  })
  const payload = verified.getPayload()
  console.log(payload)

  // TODO: 액세스 토큰을 만들어서 프론트 쿠키에 저장하기
  const accessToken = 'token'

  res.cookie('my-note-session', accessToken, {
    httpOnly: true, // 백엔드에서만 쿠키 조작 가능
    sameSite: 'none', // cors 에서도 쿠키 전송 가능
    // secure: true, // https 에서만 동작
  })

  res.send({ accessToken, payload })
})

// 구글로그인 > 유저정보(credential - JWT) > 백엔드로 보내기 >
// 백엔드에서 credential 검증 > 프론트에서 보낸 jwt 유효한지 파악 >
// 구글이 검증해줘야함. > google-auth-library 설치 > 검증
