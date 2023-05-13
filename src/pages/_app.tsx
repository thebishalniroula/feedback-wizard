import { api } from '~/utils/api'

import '~/styles/globals.css'
import { type AppProps } from 'next/app'

import { createTheme } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Layout } from '../components/layout/layout'
import { ClerkProvider } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  hasLayout?: boolean
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const _hasLayout = Component.hasLayout || false
  return (
    <NextThemesProvider
      defaultTheme='system'
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      {/* <NextUIProvider> */}
      <ClerkProvider {...pageProps}>
        {!_hasLayout && <Component {...pageProps} />}
        {_hasLayout && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ClerkProvider>
      {/* </NextUIProvider> */}
    </NextThemesProvider>
  )
}

export default api.withTRPC(MyApp)
