import styled from 'styled-components'

type Props = {
  className?: string
}

const FooterComponent: React.FC<Props> = ({ className }) => (
  <footer className={className}>
    <p>
      <small>&copy; 2020 takashima.dev</small>
    </p>
  </footer>
)

export const Footer = styled(FooterComponent)`
  margin: auto auto 40px;

  > p {
    font-size: 10px;
    color: #78757a;
  }
`
