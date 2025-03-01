import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Portofolio, Post } from "@/.velite";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });

  return tags;
}

export function sortTagsPostByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(
  posts: Array<Post>,
  tag: string,
  page: number,
  perPage: number,
) {
  const slugifiedTag = slug(tag);
  const filteredPosts = posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((t) => slug(t));
    return slugifiedTags.includes(slugifiedTag);
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return filteredPosts.slice(start, end);
}

export function getAllPortofolioTags(portofolio: Array<Portofolio>) {
  const tags: Record<string, number> = {};
  portofolio.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
}

export function getPortofolioByTagSlug(
  portofolio: Array<Portofolio>,
  tag: string,
  page: number,
  perPage: number,
) {
  const slugifiedTag = slug(tag);
  const filteredPortofolio = portofolio.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((t) => slug(t));
    return slugifiedTags.includes(slugifiedTag);
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return filteredPortofolio.slice(start, end);
}

export function sortTagsByPortofolioCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}
