import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import type { Blog } from 'types/blog';
import { getBlog, getBlogs } from 'utils/blog';
import { PageLayout } from 'components/PageLayout';
import { SEO } from 'components/SEO';
import 'zenn-content-css';

type Props = {
  blog: Blog;
};

type Params = {
  slug: string;
};

const Blog: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <SEO title={blog.title} type="article" />
      <PageLayout>
        <main>
          <h1 className="text-3xl font-medium">{blog.title}</h1>
          <div className="flex mt-1">
            <p className="text-base">{blog.published}</p>
            <ul className="flex ml-2 gap-1">
              {blog.tags.map((tag) => (
                <li key={tag}>
                  <p className="text-base">#{tag}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mb-16">
            <div className="znc" dangerouslySetInnerHTML={{ __html: blog.html }} />
          </div>
        </main>
      </PageLayout>
    </>
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
