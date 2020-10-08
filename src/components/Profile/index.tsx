import styled from 'styled-components'

type Props = {
  className?: string
  profile: string
}

const ProfileComponent: React.FC<Props> = ({ className, profile }) => (
  <article className={className}>
    <h2>高島 克彦</h2>
    <h3>Takashima Katsuhiko</h3>
    <div dangerouslySetInnerHTML={{ __html: profile }} />
  </article>
)

export const Profile = styled(ProfileComponent)`
  text-align: center;
  margin-top: 150px;

  & > h2 {
    font-size: 18px;
    font-weight: normal;
  }

  & > h3 {
    font-size: 12px;
    font-weight: normal;
  }

  & > div {
    font-size: 14px;
    margin-top: 20px;
  }
`
