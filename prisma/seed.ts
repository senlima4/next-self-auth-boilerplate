import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  if (!process.env.ADMIN_USER_EMAIL)
    throw new Error('ADMIN_USER_EMAIL env var is missing')

  if (!process.env.ADMIN_USER_PASSWORD)
    throw new Error('ADMIN_USER_PASSWORD env var is missing')

  const hashedPassword = await argon2.hash(process.env.ADMIN_USER_PASSWORD)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_USER_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_USER_EMAIL,
      name: 'administor',
      password: hashedPassword,
      isAdmin: true,
    },
  })

  console.log('admin created')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
