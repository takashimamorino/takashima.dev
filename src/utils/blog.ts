import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';

type BlogMarkdownAttributes = {
  title: string;
  published: string;
  tags: string[];
};

let blogsPath = path.join(process.cwd(), 'contents/blogs');

const isValidBlogAttributes = (attributes: any): attributes is BlogMarkdownAttributes => {
  return attributes?.title;
};

export const getBlogs = async () => {
  let dir = await fs.readdir(blogsPath);

  return Promise.all(
    dir.map(async (filename) => {
      let file = await fs.readFile(path.join(blogsPath, filename));
      let { attributes } = parseFrontMatter(file.toString());
      invariant(isValidBlogAttributes(attributes), `${filename} has bad meta data!`);
      const d = new Date(`${attributes.published}`);
      const formatted = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
        published: formatted,
        tags: attributes.tags,
      };
    })
  );
};

export const getBlog = async (slug: string) => {
  let filepath = path.join(blogsPath, slug + '.md');
  let file = await fs.readFile(filepath);
  let { attributes } = parseFrontMatter(file.toString());
  invariant(isValidBlogAttributes(attributes), `Post ${filepath} is missing attributes`);
  return { slug, title: attributes.title };
};
