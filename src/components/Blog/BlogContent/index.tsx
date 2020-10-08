import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styled from 'styled-components'

type Props = {
  className?: string
  content: string
}

type CodeBlock = {
  language: string
  value: object
}

const CodeBlock = ({ language, value }: CodeBlock) => (
  <SyntaxHighlighter language={language} style={atomOneLight}>
    {value}
  </SyntaxHighlighter>
)

const BlogContentComponent: React.FC<Props> = ({ className, content }) => (
  <ReactMarkdown
    className={className}
    source={content}
    linkTarget="_blank"
    renderers={{ code: CodeBlock }}
  />
)

export const BlogContent = styled(BlogContentComponent)`
  & {
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
      margin-bottom: 30px;
    }

    ul,
    ol {
      list-style-position: inside;
      font-size: 16px;
    }

    a {
      text-decoration: underline;
    }

    img {
      max-width: 100%;
    }

    code {
      padding: 2px 5px;
      background-color: #fafafa;
    }

    blockquote {
      font-style: italic;
      padding: 0px 12px;
      color: #78757a;
      border-left: 0.25em solid rgb(223, 226, 229);
    }
  }
`
