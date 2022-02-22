import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiHandler } from 'next'

import prisma from '@/utils/prisma'
import { sessionOptions } from '@/utils/session'
import { ok, error, notAllow, unauthorized } from '@/utils/response'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    notAllow(res)
    return
  }

  try {
    const sessionUser = req.session.user
    if (!sessionUser) {
      unauthorized(res, 'invalid')
      return
    }

    const user = await prisma.user.findUnique({ where: { id: sessionUser.id } })
    if (!user) {
      unauthorized(res, 'user not exist')
      return
    }
    if (
      user.email !== sessionUser.email &&
      user.isAdmin !== sessionUser.isAdmin
    ) {
      unauthorized(res, 'invalid')
      return
    }

    ok(res, { id: user.id, email: user.email, isAdmin: user.isAdmin })
  } catch (err) {
    if (err instanceof Error) {
      error(res, err.message)
      return
    }
    error(res, 'unhandled')
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
