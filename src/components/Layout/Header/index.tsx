import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  className?: string
}

const HeaderComponent: React.FC<Props> = ({ className }) => (
  <header className={className}>
    <Link href="/">
      <a>takashima.dev</a>
    </Link>
    <Link href="/blog/">
      <a>Blog</a>
    </Link>
  </header>
)

export const Header = styled(HeaderComponent)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;

  > a:first-child {
    font-size: 18px;
  }

  > a {
    font-size: 14px;
  }
`
