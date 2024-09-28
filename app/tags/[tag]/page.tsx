import { posts } from "@/.velite"; 
import TagClient from "./tagClient";

interface TagPageProps {
  params: {
    tag: string;
  };
}

// Generate static params for the dynamic routing
export function generateStaticParams() {
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
  return tags.map(tag => ({ tag }));
}

export default function TagPage({ params }: TagPageProps) {
  return <TagClient tag={params.tag} />;
}
