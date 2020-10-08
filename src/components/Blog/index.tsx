import styled from 'styled-components'

import { useFormatDate } from 'hooks/useFormatDate'
import { BlogContent } from 'components/Blog/BlogContent'

type Props = {
  className?: string
  title: string
  date: string
  content: string
}

export const BlogComponent: React.FC<Props> = ({
  className,
  title,
  date,
  content,
}) => {
  const { formattedDate } = useFormatDate(date, 'YYYY-MM-DD')

  return (
    <article className={className}>
      <section>
        <h1>{title}</h1>
        <p>{formattedDate}</p>
      </section>
      <BlogContent content={content} />
    </article>
  )
}

export const Blog = styled(BlogComponent)`
  & > section {
    margin-bottom: 30px;
  }

  & > section > h1 {
    font-size: 22px;
  }

  & > section > p {
    font-size: 12px;
  }
`
