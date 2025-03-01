import { posts } from "@/.velite";
import TagClient from "./tagClient";
import { Metadata } from "next";

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
    description: `Blog tagged with ${params.tag}`,
  };
};

export function generateStaticParams() {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({ tag }));
}

export default function TagBlogPage({ params }: TagBlogPageProps) {
  return <TagClient tag={params.tag} />;
}
