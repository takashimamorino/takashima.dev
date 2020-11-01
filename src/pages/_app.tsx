import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import 'ress'

import { pageview } from 'lib/gtag'
import { Layout } from 'components/Layout'

const GlobalStyle = createGlobalStyle`
  body, a {
    color: #48434f;
    letter-spacing: 0.05em;
  }
  a {
    text-decoration: none;

    &:hover {
      opacity: 0.7
    }
  }
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
