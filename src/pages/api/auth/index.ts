import argon2 from 'argon2'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiHandler } from 'next'

import { createUser } from '@/models/user'

import prisma from '@/utils/prisma'
import { ok, error, notAllow, unauthorized } from '@/utils/response'
import { sessionOptions, toSessionUser } from '@/utils/session'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    notAllow(res)
    return
  }

  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      const newUser = await createUser({ email, password })

      const sessionUser = toSessionUser(newUser)
      req.session.user = sessionUser
      await req.session.save()

      ok(res, user)
      return
    }

    if (user.password) {
      const isPwdCorrect = await argon2.verify(user.password, password)
      if (isPwdCorrect) {
        const sessionUser = toSessionUser(user)
        req.session.user = sessionUser
        await req.session.save()

        ok(res, user)
        return
      }
      unauthorized(res, 'invalid login')
    }

    unauthorized(res, 'invalid login')
  } catch (err) {
    if (err instanceof Error) {
      error(res, err.message)
      return
    }
    error(res, 'unhandled')
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
