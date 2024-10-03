import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "@/.velite";
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
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string, page: number, perPage: number) {
  const slugifiedTag = slug(tag); // Normalize the incoming tag
  const filteredPosts = posts.filter(post => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map(t => slug(t)); // Ensure tags are slugified for comparison
    return slugifiedTags.includes(slugifiedTag);
  });
  
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  console.log("Filtered Posts for Tag:", slugifiedTag, filteredPosts); // Debugging output
  
  return filteredPosts.slice(start, end);
}

