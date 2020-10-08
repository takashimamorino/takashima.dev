import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import { useFormatDate } from 'hooks/useFormatDate'

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
      <ReactMarkdown className="content" source={content} linkTarget="_blank" />
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

  /* ブログ本文のスタイル */
  & > .content {
    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
    }

    h4 {
      font-size: 16px;
    }

    p {
      font-size: 16px;
    }

    h2,
    h3,
    h4,
    pre {
      margin-bottom: 12px;
    }

    p,
    ul,
    ol {
      margin-bottom: 20px;
    }

    ul,
    ol {
      list-style-position: inside;
      font-size: 16px;
    }

    blockquote {
      font-style: italic;
      padding: 0px 12px;
      color: #78757a;
      border-left: 0.25em solid rgb(223, 226, 229);
    }

    img {
      max-width: 100%;
    }
  }
`
