import { type Article } from 'types/article';
import { formatDate } from 'utils/date';

const RSS_TO_JSON_END_POINT = 'https://rss2json.com/api.json?rss_url=';
const ZENN_RSS_MY_FEED = 'https://zenn.dev/takashima/feed';
const HATENA_RSS_MY_GUDIY_FEED = 'https://techblog.gaudiy.com/feed/author/does1026';

const getZennArticles = async (): Promise<Article[]> => {
  const data = await fetch(`${RSS_TO_JSON_END_POINT}${ZENN_RSS_MY_FEED}`).then((res) => res.json());
  const articles = data.items.map((item: any) => {
    const date = formatDate(item.pubDate);

    return {
      link: item.link,
      title: item.title,
      published: date,
    };
  });

  return articles;
};

const getHatenaArticles = async (): Promise<Article[]> => {
  const data = await fetch(`${RSS_TO_JSON_END_POINT}${HATENA_RSS_MY_GUDIY_FEED}`).then((res) =>
    res.json()
  );
  const articles = data.items.map((item: any) => {
    const date = formatDate(item.pubDate);

    return {
      link: item.link,
      title: item.title,
      published: date,
    };
  });

  return articles;
};

export const getArticles = async (): Promise<Article[]> => {
  const zennArticles = await getZennArticles();
  const hatenaArticles = await getHatenaArticles();

  const articles = [...zennArticles, ...hatenaArticles];

  const ascArray = articles.sort((prev, next) => {
    return new Date(prev.published) > new Date(next.published) ? -1 : 1;
  });

  return ascArray;
};
