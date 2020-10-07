import { NextPage, GetStaticPaths } from 'next'

import { BlogArticle } from 'types/blog'

type Props = {
  post: BlogArticle
}

type Params = {
  params: {
    id: string
  }
}

const Blog: NextPage<Props> = ({ post }) => <h2>{post.title}</h2>

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blog/`, {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })
  const { contents } = await res.json()
  const paths = contents.map((content: BlogArticle) => ({
    params: { id: content.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: Params) => {
  const res = await fetch(`${process.env.ENDPOINT}/blog/${params.id}`, {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  })
  const post: BlogArticle = await res.json()

  return { props: { post } }
}

export default Blog
