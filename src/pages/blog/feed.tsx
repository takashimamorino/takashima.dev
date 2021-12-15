import { type GetServerSidePropsContext } from 'next';
import { generateFeedXml } from 'utils/blog';

const Feed = () => null;

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

export default Feed;
