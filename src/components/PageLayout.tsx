import type { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const PageLayout: VFC<Props> = ({ children }) => {
  return <div className="container max-w-2xl mx-auto px-4">{children}</div>;
};
