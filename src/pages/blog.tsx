import React from 'react'
import { NextPage, GetStaticProps } from 'next'

import { BlogListItem } from 'components/BlogListItem'

type Props = {
  contents: Array<{
    content: string
    createdAt: string
    id: string
    publishedAt: string
    tags: Array<{ id: string; tags: string }>
    title: string
    updatedAt: string
  }>
}

const BlogIndexPage: NextPage<Props> = ({ contents }) => (
  <>
    {contents.map((content) => (
      <BlogListItem key={content.id} content={content} />
    ))}
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://takashimadev.microcms.io/api/v1/blog', {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })

  const { contents } = await res.json()

  return { props: { contents } }
}

export default BlogIndexPage
