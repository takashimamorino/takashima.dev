import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import RSS from 'rss';
import type { Blog } from 'types/blog';

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
  const dir = await fs.readdir(blogsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(blogsPath, filename));
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
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(isValidBlogAttributes(attributes), `Post ${filepath} is missing attributes`);
  const d = new Date(`${attributes.published}`);
  const formatted = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const html = marked(body);

  return { slug, title: attributes.title, published: formatted, tags: attributes.tags, html };
};

export const generateFeedXml = async () => {
  const feed = new RSS({
    title: 'takashima.dev',
    description: 'piyopiyo',
    site_url: 'https://takashima.dev',
    feed_url: 'https://www.takashima.dev/blog/feed',
    language: 'ja',
  });

  const blogs = await getBlogs();
  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.html,
      date: new Date(blog.published),
      url: `https://takashima.dev/blog/${blog.slug}`,
    });
  });

  return feed.xml();
};
