import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import remarkMath from "remark-math";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      date: s.isodate(),
      created_at: s.isodate().optional(),
      updated_at: s.isodate().optional(),
      updated_reason: s.string().optional(),
      status: s.string().optional(),
      excerpt: s.string().max(999).optional(),
      readTime: s.string().optional(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      image: s.string().optional(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const portofolio = defineCollection({
  name: "Portofolio",
  pattern: "portfolio/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      image: s.string(),
      excerpt: s.string().max(999).optional(),
      date: s.isodate(),
      created_at: s.isodate().optional(),
      updated_at: s.isodate().optional(),
      updated_reason: s.string().optional(),
      status: s.string(),
      tags: s.array(s.string()).optional(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const cheatsheet = defineCollection({
  name: "Cheatsheet",
  pattern: "cheatsheet/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      created_at: s.isodate().optional(),
      updated_at: s.isodate().optional(),
      status: s.string().default("verified"),
      version: s.string().optional(),
      order: s.number().optional(),
      tags: s.array(s.string()).optional(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, portofolio, cheatsheet },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "dark-plus" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      rehypeKatex,
      rehypeMermaid
    ],
    remarkPlugins: [remarkMath],
  },
});
