import argon2 from 'argon2'

import prisma from '@/utils/prisma'

interface CreateUserInput {
  email: string
  password: string
}

export const createUser = async ({ email, password }: CreateUserInput) => {
  const hashedPassword = await argon2.hash(password)
  const user = await prisma.user.create({
    data: {
      email,
      name: email.split('@')[0],
      password: hashedPassword,
    },
  })
  return user
}
