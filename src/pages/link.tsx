import { NextPage, GetStaticProps } from 'next'

import { SNSLink } from 'types/snsLink'
import { LinkList } from 'components/LinkList'

type Props = {
  contents: Array<SNSLink>
}

const LinkPage: NextPage<Props> = ({ contents }) => (
  <LinkList contents={contents} />
)

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/links/`, {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })
  const { contents } = await res.json()

  return { props: { contents } }
}

export default LinkPage
