import { NextPage } from 'next';
import { getBlogs } from 'utils/blog';
import { Blog } from 'types/blog';

type Props = {
  blogs: Blog[];
};

const Blogs: NextPage<Props> = ({ blogs }) => {
  console.log(blogs);
  return <></>;
};

export default Blogs;

export const getStaticProps = async () => {
  const blogs = await getBlogs();

  return {
    props: { blogs },
  };
};
