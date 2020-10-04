import React from 'react'
import styled from 'styled-components'

import { BlogArticle } from 'types/blog'

type Props = {
  className?: string
} & Pick<BlogArticle, 'tags'>

const TagsComponent: React.FC<Props> = ({ className, tags }) => (
  <ul className={className}>
    {tags.map((tag) => (
      <li key={tag.id}>#{tag.tags}</li>
    ))}
  </ul>
)

export const Tags = styled(TagsComponent)`
  display: flex;
  gap: 5px;
  margin-left: 15px;
  font-size: 12px;
  list-style: none;
`
