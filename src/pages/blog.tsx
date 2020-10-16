import { NextPage, GetStaticProps } from 'next'

import { BlogArticle } from 'types/blog'
import { SEO } from 'components/SEO'
import { BlogListItem } from 'components/BlogListItem'

type Props = {
  contents: Array<BlogArticle>
}

const BlogIndexPage: NextPage<Props> = ({ contents }) => (
  <>
    <SEO title="Blog" />
    {contents.map((content) => (
      <BlogListItem key={content.id} content={content} />
    ))}
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blog/`, {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })
  const { contents } = await res.json()

  return { props: { contents } }
}

export default BlogIndexPage
