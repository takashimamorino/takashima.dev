import styled from 'styled-components'

import { Header } from 'components/Layout/Header'
import { Footer } from 'components/Layout/Footer'

type Props = {
  className?: string
  children: React.ReactNode
}

const LayoutComponent: React.FC<Props> = ({ className, children }) => (
  <div className={className}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

export const Layout = styled(LayoutComponent)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > main {
    max-width: 720px;
    width: 100%;
    margin: 0 auto 100px;
    padding: 0 24px;
  }
`
