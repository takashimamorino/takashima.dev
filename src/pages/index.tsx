import { type NextPage, type GetStaticProps } from 'next';
import Link from 'next/link';
import { GitHubIcon } from 'icons/GitHub';
import { TwitterIcon } from 'icons/Twitter';
import { getBlogs } from 'utils/blog';
import { type Blog } from 'types/blog';
import { PageLayout } from 'components/PageLayout';
import { SEO } from 'components/SEO';
import { generateFeedXml } from 'utils/blog';
import { getArticles } from 'utils/article';
import { getRecord } from 'utils/record';
import { type Article } from 'types/article';
import { type Record } from 'types/record';

type Props = {
  blogs: Blog[];
  articles: Article[];
  record: Record[];
};

const Home: NextPage<Props> = ({ blogs, articles, record }) => {
  return (
    <>
      <SEO type="website" />
      <PageLayout>
        <main>
          <section className="text-center">
            <h3 className="text-xl font-medium tracking-wide">高島 克彦</h3>
            <h3 className="text-sm font-light tracking-wide">Takashima Katsuhiko</h3>
          </section>
          <article className="mt-6">
            <section>
              <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
                SNS
              </h2>
              <div className="grid gap-3 mt-4">
                <a
                  href="https://github.com/takashimamorino"
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-2 w-max items-center"
                >
                  <GitHubIcon />
                  <p className="text-base">@takashimamorino</p>
                </a>
                <a
                  href="https://twitter.com/takashima_katsu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-2 w-max items-center"
                >
                  <TwitterIcon />
                  <p className="text-base">@takashima_katsu</p>
                </a>
              </div>
            </section>
            <section className="mt-4">
              <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
                Articles
              </h2>
              <ul className="mt-3 grid gap-2">
                {articles.map((article) => (
                  <li key={article.link}>
                    <div className="flex">
                      <p className="text-sm">{article.published}</p>
                    </div>
                    <a
                      className="text-xl"
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mt-4">
              <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
                Blog
              </h2>
              <ul className="mt-3 grid gap-2">
                {blogs.map((blog) => (
                  <li key={blog.slug}>
                    <div className="flex">
                      <p className="text-sm">{blog.published}</p>
                      <ul className="flex ml-2 gap-1">
                        {blog.tags.map((tag) => (
                          <li key={tag}>
                            <p className="text-sm">#{tag}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <a className="text-xl">{blog.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mt-4">
              <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
                Record
              </h2>
              <ul className="mt-3 grid gap-2">
                {record.map((r) => (
                  <li key={r.link}>
                    <a className="text-xl" href={r.link} target="_blank" rel="noopener noreferrer">
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </main>
      </PageLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // NOTE: RSS feed is generated on the server side.
  await generateFeedXml();

  const blogs = await getBlogs();
  const ascArray = blogs.sort((prev, next) => {
    return new Date(prev.published) > new Date(next.published) ? -1 : 1;
  });
  const articles = await getArticles();
  const record = await getRecord();

  return {
    props: { blogs: ascArray, articles, record },
  };
};
