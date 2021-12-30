import { type ReactNode, type VFC } from 'react';
import { Header } from 'components/Header';

type Props = {
  children: ReactNode;
};

export const PageLayout: VFC<Props> = ({ children }) => {
  return (
    <div className="container max-w-2xl mx-auto px-4">
      <div className="mt-4">
        <Header />
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
};
