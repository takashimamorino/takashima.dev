import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import type { Blog } from 'types/blog';
import { getBlog, getBlogs } from 'utils/blog';
import { PageLayout } from 'components/PageLayout';
import 'zenn-content-css';

type Props = {
  blog: Blog;
};

type Params = {
  slug: string;
};

const Blog: NextPage<Props> = ({ blog }) => {
  return (
    <PageLayout>
      <main className="mt-6">
        <h1 className="text-xl font-semibold">{blog.title}</h1>
        <p className="text-sm">{blog.published}</p>
        <div className="mt-6 mb-16">
          <div className="znc" dangerouslySetInnerHTML={{ __html: blog.html }} />
        </div>
      </main>
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getBlogs();

  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('No slug');
  }
  const blog = await getBlog(params.slug);

  return {
    props: { blog },
  };
};

export default Blog;
