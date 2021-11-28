import type { NextPage } from 'next';
import type { ReactNode, VFC } from 'react';
import { GitHubIcon } from 'icons/GitHub';
import { TwitterIcon } from 'icons/Twitter';

const Home: NextPage = () => {
  return (
    <PageLayout>
      <main className="mt-6">
        <section className="text-center">
          <h3 className="text-xl font-normal tracking-wide">高島 克彦</h3>
          <h3 className="text-sm font-light tracking-wide">Takashima Katsuhiko</h3>
        </section>
        <article className="mt-6">
          <section>
            <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">SNS</h2>
            <div className="grid gap-2 mt-4">
              <a
                href="https://github.com/takashimamorino"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 w-max"
              >
                <GitHubIcon />
                <p className="text-sm">@takashimamorino</p>
              </a>
              <a
                href="https://twitter.com/takashima_katsu"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 w-max"
              >
                <TwitterIcon />
                <p className="text-sm">@takashima_katsu</p>
              </a>
            </div>
          </section>
          <section className="mt-4">
            <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
              ブログ
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
                  <a className="text-xl">{blog.title}</a>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-4">
            <h2 className="text-lg font-medium tracking-wide border-b-4 border-black w-max">
              月報
            </h2>
            <ul className="mt-3 grid gap-2">
              {monthlyReports.map((report) => (
                <li key={report.slug}>
                  <div className="flex">
                    <p className="text-sm">{report.published}</p>
                  </div>
                  <a className="text-xl">{report.title}</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </PageLayout>
  );
};

export default Home;

type Props = {
  children: ReactNode;
};

const PageLayout: VFC<Props> = ({ children }) => {
  return <div className="container max-w-2xl mx-auto px-4">{children}</div>;
};

const blogs = [
  {
    title: 'foo',
    published: '2021-11-28',
    slug: 'foo',
    tags: ['foo', 'bar'],
  },
  {
    title: 'bar',
    published: '2021-11-29',
    slug: 'bar',
    tags: ['bar'],
  },
];

const monthlyReports = [
  {
    title: '2021 年 11 月',
    published: '2021-11-28',
    slug: 'foo',
  },
  {
    title: '2021 年 12 月',
    published: '2021-11-28',
    slug: 'foo',
  },
];
