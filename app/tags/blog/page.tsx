import { posts } from "@/.velite";
import { Metadata } from "next";
import TagBlogClient from "./[tag]/tagClient";

interface TagBlogPageProps {
  params: {
    tag: string;
  };
}

export const generateMetadata = ({
  params,
}: {
  params: { tag: string };
}): Metadata => {
  return {
    title: `${params.tag} | Blog Tags`,
    description: `Posts tagged with ${params.tag}`,
  };
};

export function generateStaticParams() {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default function TagBlogPage({ params }: TagBlogPageProps) {
  return <TagBlogClient tag={params.tag} />;
}
