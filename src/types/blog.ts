export type BlogArticle = {
  content: string
  createdAt: string
  id: string
  publishedAt: string
  tags: Tag[]
  title: string
  updatedAt: string
}

type Tag = { id: string; tags: string }
