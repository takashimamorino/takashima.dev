import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { GoogleAnalytics } from 'components/GoogleAnalytics';
import { pageview } from 'utils/gtag';
import { GA_ID } from 'constants/env';

const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    if (!GA_ID) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
