import Head from 'next/head'

type Props = {
  title?: string
}

export const SEO: React.FC<Props> = ({ title }) => (
  <Head>
    <title>{title ? `${title} | takashima.dev` : 'takashima.dev'}</title>
    <meta property="og:site_name" content="takashima.dev" />
    <meta property="og:title" content={`takashima.dev | ${title}`} />
    <meta property="description" content="ぴよぴよ" />
    <meta property="og:description" content="ぴよぴよ" />
    <meta
      property="og:image"
      content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/hatching-chick_1f423.png"
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
)
