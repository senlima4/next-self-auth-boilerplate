import * as React from 'react'
import { useForm } from 'react-hook-form'
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

import type { PasswordAuthFormFields } from '@/types'

interface Props {
  handleAuth: (data: PasswordAuthFormFields) => Promise<void>
}

const AuthForm: React.FC<Props> = ({ handleAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PasswordAuthFormFields>()

  const onSubmit = async (data: PasswordAuthFormFields) => {
    await handleAuth(data)
  }

  return (
    <VStack as="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          {...register('email', { required: true })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
      </FormControl>

      <Button
        w="full"
        type="submit"
        loadingText="Submitting"
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </VStack>
  )
}

export default React.memo(AuthForm)
