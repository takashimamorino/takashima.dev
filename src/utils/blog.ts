import path from 'path';
import fs from 'fs';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { type Blog } from 'types/blog';
import { Feed } from 'feed';

type BlogMarkdownAttributes = {
  title: string;
  published: string;
  tags: string[];
};

const blogsPath = path.join(process.cwd(), 'contents/blogs');

const isValidBlogAttributes = (attributes: any): attributes is BlogMarkdownAttributes => {
  return attributes?.title;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const dir = await fs.promises.readdir(blogsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.promises.readFile(path.join(blogsPath, filename));
      const { attributes, body } = parseFrontMatter(file.toString());
      invariant(isValidBlogAttributes(attributes), `${filename} has bad meta data!`);
      const d = new Date(`${attributes.published}`);
      const formatted = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const html = marked(body);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
        published: formatted,
        tags: attributes.tags,
        html,
      };
    })
  );
};

export const getBlog = async (slug: string): Promise<Blog> => {
  const filepath = path.join(blogsPath, slug + '.md');
  const file = await fs.promises.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(isValidBlogAttributes(attributes), `Post ${filepath} is missing attributes`);
  const d = new Date(`${attributes.published}`);
  const formatted = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const html = marked(body);

  return { slug, title: attributes.title, published: formatted, tags: attributes.tags, html };
};

export const generateFeedXml = async () => {
  const baseUrl = 'https://takashima.dev';
  const date = new Date();

  const author = {
    name: 'sample',
    email: 'sample@sample.com',
    link: 'https://...com',
  };

  // デフォルトになる feed の情報
  const feed = new Feed({
    title: process.env.NEXT_PUBLIC_BASE_NAME || '',
    description: process.env.NEXT_PUBLIC_BASE_DISC,
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.png`, // image には OGP 画像でなくファビコンを指定
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    feed.addItem({
      title: blog.title,
      id: blog.slug,
      link: `https://takashima.dev/blog/${blog.slug}`,
      content: blog.html,
      date: new Date(blog.published),
    });
  });

  // フィード情報を public/rss 配下にディレクトリを作って保存
  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
};
