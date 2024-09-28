import { posts } from "@/.velite";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { slug } from "github-slugger";
import TagPageClient from "./tagClient";

interface TagPageProps {
  params: {
    tag: string;
    page?: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export async function generateStaticParams() {
  const tags = getAllTags(posts);
  const paths = [];

  for (const tag of Object.keys(tags)) {
    const sluggedTag = slug(tag);
    const tagPosts = posts.filter(post => post.tags && post.tags.includes(tag));
    const totalPages = Math.ceil(tagPosts.length / 5); // Assuming 5 posts per page

    // Generate params for each page of each tag
    for (let page = 1; page <= totalPages; page++) {
      paths.push({ tag: sluggedTag, page: page.toString() });
    }
  }

  return paths;
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");
  
  const page = params.page ? parseInt(params.page, 10) : 1; 
  const perPage = 5; 
  const allPosts = getPostsByTagSlug(posts, tag, page, perPage);
  const displayPosts = allPosts.filter(post => post.published);
  
  const totalPosts = posts.filter(post => post.tags && post.tags.includes(tag)).length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <TagPageClient
      title={title}
      tag={tag}
      displayPosts={displayPosts}
      totalPages={totalPages}
      currentPage={page}
      sortedTags={sortedTags}
      tags={tags}
    />
  );
}