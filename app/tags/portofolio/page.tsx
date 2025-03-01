import {
  getAllPortofolioTags,
  getAllPostTags,
  sortTagsByPortofolioCount,
} from "@/lib/utils";
import { Metadata } from "next";
import { portofolio } from "@/.velite";
import { Tag } from "@/components/tag";

export const metadata: Metadata = {
  title: "Tags Portofolio",
  description: "Topic I've written about",
};

export default async function TagsPortofolioPage() {
  const tags = getAllPortofolioTags(portofolio);
  const sortedTags = sortTagsByPortofolioCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            Tags Portofolio
          </h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag name="blog" tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  );
}
