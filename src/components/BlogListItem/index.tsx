import Link from 'next/link'
import styled from 'styled-components'

import { BlogArticle } from 'types/blog'
import { useFormatDate } from 'hooks/useFormatDate'
import { Tags } from 'components/Tags'

type BlogListItemData = Pick<
  BlogArticle,
  'id' | 'publishedAt' | 'tags' | 'title'
>

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
      <Link href={`blog/${content.id}`}>
        <a>{content.title}</a>
      </Link>
    </article>
  )
}

export const BlogListItem = styled(BlogListItemComponent)`
  max-width: 640px;
  margin: 20px auto 0px;

  & > div {
    display: flex;
  }

  & > div > p {
    font-size: 12px;
  }

  & > a {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`
