import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <div className="w-full h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-8 flex flex-col justify-center h-full">
          <div className="text-center p-10 py-10">
            <h2 className="text-4xl sm:text-7xl font-bold text-[#585a5c] dark:text-slate-200">
              Renaldy Hidayat
            </h2>
            <h3 className="text-2xl py-2 text-[#585a5c] dark:text-slate-200 md:text-3xl">
              I&apos;ll be improving my learning in backend, machine learning,
              and a little bit of frontend.
            </h3>
          </div>
        </div>
      </div>

      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60 bg-background">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center text-[#585a5c] dark:text-slate-200">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            post.published && (
              <li key={post.slug} className="first:border-t first:border-border">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              </li>
            )
          ))}
        </ul>
      </section>

    </>
  );
}
