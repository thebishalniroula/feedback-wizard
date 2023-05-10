import { SessionProvider } from 'next-auth/react'
import { api } from '~/utils/api'

import '~/styles/globals.css'
import { type AppProps } from 'next/app'
import { type Session } from 'next-auth'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <main className='dark:bg-gray-800 dark:text-gray-100 min-h-screen'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
