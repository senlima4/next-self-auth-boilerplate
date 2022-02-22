import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiHandler } from 'next'

import { done, notAllow } from '@/utils/response'
import { sessionOptions } from '@/utils/session'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    notAllow(res)
    return
  }

  req.session.destroy()
  done(res)
}

export default withIronSessionApiRoute(handler, sessionOptions)
