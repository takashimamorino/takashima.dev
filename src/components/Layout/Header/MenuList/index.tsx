import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  className?: string
}

export const MenuListComponent: React.FC<Props> = ({ className }) => (
  <nav className={className}>
    <Link href="/link/">
      <a>Link</a>
    </Link>
    <Link href="/blog/">
      <a>Blog</a>
    </Link>
  </nav>
)

export const MenuList = styled(MenuListComponent)`
  display: flex;
  gap: 30px;
  line-height: 0;

  & > a {
    font-size: 14px;
  }
`
