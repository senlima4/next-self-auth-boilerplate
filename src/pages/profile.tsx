import { useRouter } from 'next/router'
import { Box, Text, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'

import useUser from '@/hooks/use-user'

import fetcher from '@/utils/fetcher'

const Profile: NextPage = () => {
  const router = useRouter()
  const { user, mutateUser } = useUser({
    redirectTo: '/auth',
  })

  const handleLogout = async () => {
    await fetcher('/api/auth/logout', { method: 'POST' })
    await mutateUser(undefined)
    router.push('/auth')
  }

  return (
    <Box w="95%" maxW="375px" mt="15vh" mx="auto">
      <Text>email: {user?.email}</Text>
      <Button onClick={handleLogout}>logout</Button>
    </Box>
  )
}

export default Profile
