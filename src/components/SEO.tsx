import type { VFC } from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
  type: 'website' | 'article';
};

export const SEO: VFC<Props> = ({ title, type }) => (
  <Head>
    <title>takashima.dev</title>
    <meta property="og:site_name" content="takashima.dev" />
    <meta property="og:title" content={title ?? 'takashima.dev'} />
    <meta
      property="og:image"
      content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/hatching-chick_1f423.png"
    />
    <meta property="og:type" content={type} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);
