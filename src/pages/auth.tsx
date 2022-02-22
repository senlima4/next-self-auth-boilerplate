import * as React from 'react'
import { Box, Flex, Text, Heading, Divider } from '@chakra-ui/react'
import type { NextPage } from 'next'

import useUser from '@/hooks/use-user'

import { AuthForm } from '@/components/auth-form'
import type { PasswordAuthFormFields } from '@/types'

import fetcher, { FetchError } from '@/utils/fetcher'

const Auth: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  })
  const [errorMsg, setErrorMsg] = React.useState('')

  const handleAuth = async (data: PasswordAuthFormFields) => {
    try {
      mutateUser(
        await fetcher('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  return (
    <Box w="95%" maxW="375px" mt="15vh" mx="auto">
      <Heading as="h1" size="lg" mb={6}>
        Login / Create Account
      </Heading>

      <Flex w="full" color="gray.400" align="center">
        <Divider orientation="horizontal" />
        <Text mx={2} fontSize="sm" whiteSpace="nowrap">
          via email password
        </Text>
        <Divider orientation="horizontal" />
      </Flex>
      <AuthForm handleAuth={handleAuth} />
    </Box>
  )
}

export default Auth
