import { portofolio } from "@/.velite";
import TagClient from "./tagClient";
import { Metadata } from "next";

interface TagPortofolioPageProps {
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
    title: `${params.tag} | Portofolio Tags`,
    description: `Portofolio tagged with ${params.tag}`,
  };
};

export function generateStaticParams() {
  const tags = Array.from(new Set(portofolio.flatMap((post) => post.tags)));
  return tags.map((tag) => ({ tag }));
}

export default function TagPortofolioPage({ params }: TagPortofolioPageProps) {
  return <TagClient tag={params.tag} />;
}
