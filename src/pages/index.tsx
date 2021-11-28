import type { NextPage } from 'next';
import type { ReactNode, VFC } from 'react';

const Home: NextPage = () => {
  return (
    <PageLayout>
      <main className="mt-6">
        <section className="text-center">
          <h3 className="text-lg font-light tracking-wide">高島 克彦</h3>
          <h3 className="text-sm font-light tracking-wide">Takashima Katsuhiko</h3>
        </section>
        <article>
          <section>
            <h2>SNS</h2>
            <p>GitHub</p>
            <p>Twitter</p>
          </section>
          <section>
            <h2>ブログ</h2>
          </section>
          <section>
            <h2>週報</h2>
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
  return <div className="container mx-auto px-4">{children}</div>;
};
