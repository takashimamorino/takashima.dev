import { NextPage, GetStaticProps } from 'next'

import { SEO } from 'components/SEO'
import { Profile } from 'components/Profile'

type Props = {
  profile: string
}

const HomePage: NextPage<Props> = ({ profile }) => (
  <>
    <SEO />
    <Profile profile={profile} />
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/profile/`, {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })
  const { profile } = await res.json()

  return { props: { profile } }
}

export default HomePage
