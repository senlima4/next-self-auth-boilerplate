import * as React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { FetchError } from '@/utils/fetcher'
import type { SessionUser } from '@/utils/session'

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const router = useRouter()
  const {
    data: user,
    mutate: mutateUser,
    error,
  } = useSWR<SessionUser>('/api/auth/validation')

  React.useEffect(() => {
    if ((!user && !error) || !redirectTo) return

    if (redirectIfFound && user) router.push(redirectTo)
    if (!redirectIfFound && user === undefined) router.push(redirectTo)
  }, [user, error, redirectTo, redirectIfFound, router])

  return { user, mutateUser }
}

export default useUser
