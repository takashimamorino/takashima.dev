import path from 'path';
import fs from 'fs';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { type Blog } from 'types/blog';
import { Feed } from 'feed';
import markdownToHtml from 'zenn-markdown-html';

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
      const html = markdownToHtml(body);

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
  const html = markdownToHtml(body);

  return { slug, title: attributes.title, published: formatted, tags: attributes.tags, html };
};

const BASE_URL = 'https://takashima.dev';

export const generateFeedXml = async () => {
  const date = new Date();

  const author = {
    name: 'takashima',
    email: 'does1026@gmail.com',
    link: BASE_URL,
  };

  const feed = new Feed({
    title: BASE_URL,
    description: BASE_URL,
    id: BASE_URL,
    link: BASE_URL,
    language: 'ja',
    image:
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/hatching-chick_1f423.png',
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${BASE_URL}/rss/feed.xml`,
      json: `${BASE_URL}/rss/feed.json`,
      atom: `${BASE_URL}/rss/atom.xml`,
    },
    author: author,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    feed.addItem({
      title: blog.title,
      id: blog.slug,
      link: `${BASE_URL}/blog/${blog.slug}`,
      content: blog.html,
      date: new Date(blog.published),
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
};
