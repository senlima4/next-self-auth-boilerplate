import type { IronSessionOptions } from 'iron-session'
import type { User } from '@prisma/client'

export interface SessionUser {
  isAdmin: boolean
  email: string
  id: string
}

export const toSessionUser = ({ id, email, isAdmin }: User): SessionUser => ({
  id,
  email,
  isAdmin,
})

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'pj-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionUser
  }
}
