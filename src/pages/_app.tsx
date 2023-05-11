import { SessionProvider } from 'next-auth/react'
import { api } from '~/utils/api'

import '~/styles/globals.css'
import { type AppProps } from 'next/app'
import { type Session } from 'next-auth'

import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Layout } from '../components/layout/layout'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {},
  },
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
})

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
  return (
    <NextThemesProvider
      defaultTheme='system'
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Layout>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default api.withTRPC(MyApp)
