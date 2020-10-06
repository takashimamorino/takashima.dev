import styled from 'styled-components'

import { BlogArticle } from 'types/blog'
import { useFormatDate } from 'hooks/useFormatDate'
import { Tags } from 'components/Tags'

type BlogListItemData = Pick<BlogArticle, 'publishedAt' | 'tags' | 'title'>

type Props = {
  className?: string
  content: BlogListItemData
}

const BlogListItemComponent: React.FC<Props> = ({ className, content }) => {
  const { formattedDate } = useFormatDate(content.publishedAt, 'YYYY-MM-DD')

  return (
    <article className={className}>
      <div>
        <p>{formattedDate}</p>
        <Tags tags={content.tags} />
      </div>
      <a>{content.title}</a>
    </article>
  )
}

export const BlogListItem = styled(BlogListItemComponent)`
  max-width: 640px;
  margin: 0 auto 20px;

  & > div {
    display: flex;
  }

  & > div > p {
    font-size: 12px;
  }

  & > a {
    font-size: 16px;
  }
`
