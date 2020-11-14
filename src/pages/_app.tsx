import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import 'ress'

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

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default MyApp
