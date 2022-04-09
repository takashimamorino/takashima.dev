import { type Article } from 'types/article';

const RSS_TO_JSON_END_POINT = 'https://rss2json.com/api.json?rss_url=';
const ZENN_RSS_MY_FEED = 'https://zenn.dev/takashima/feed';

export const getArticles = async (): Promise<Article> => {
  const data = await fetch(`${RSS_TO_JSON_END_POINT}${ZENN_RSS_MY_FEED}`).then((res) => res.json());
  const articles = data.items.map((item: any) => {
    const d = new Date(item.pubDate);
    const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    return {
      link: item.link,
      title: item.title,
      published: formatted,
    };
  });

  return articles;
};
