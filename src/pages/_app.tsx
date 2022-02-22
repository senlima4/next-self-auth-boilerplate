import { SWRConfig } from 'swr'
import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import fetcher from '@/utils/fetcher'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: err => {
          console.error(err)
        },
      }}
    >
      <ChakraProvider colorModeManager={localStorageManager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  )
}

export default MyApp
