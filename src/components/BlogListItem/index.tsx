import React from 'react'
import styled from 'styled-components'

import { Tags } from 'components/Tags'
import { useDate } from 'hooks/useDate'

type Props = {
  className?: string
  content: {
    content: string
    createdAt: string
    id: string
    publishedAt: string
    tags: Array<{ id: string; tags: string }>
    title: string
  }
}

const BlogListItemComponent: React.FC<Props> = ({ className, content }) => {
  const { formattedDate } = useDate(content.publishedAt, 'YYYY-MM-DD')

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
