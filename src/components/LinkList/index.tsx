import Link from 'next/link'
import styled from 'styled-components'

import { SNSLink } from 'types/snsLink'

type Props = {
  className?: string
  contents: Array<SNSLink>
}

const LinkListComponent: React.FC<Props> = ({ className, contents }) => (
  <ul className={className}>
    {contents.map((content) => (
      <li key={content.id}>
        <Link href={content.link}>
          <a target="_blank">{content.name}</a>
        </Link>
      </li>
    ))}
  </ul>
)

export const LinkList = styled(LinkListComponent)`
  display: grid;
  gap: 30px;
  margin-top: 100px;
  list-style: none;
  text-align: center;
  font-size: 14px;
`
