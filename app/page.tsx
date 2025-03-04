"use client"
import { sortPosts } from "@/lib/utils";
import { posts } from "@/.velite";
import { PostItem } from "@/components/post-item";
import HomeHeader from "@/components/header-home";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const latestPosts = sortPosts(posts).slice(0, 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="w-full h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-8 flex flex-col justify-center h-full">
          <HomeHeader />
        </div>
      </div>

      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60 bg-background">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center text-[#585a5c] dark:text-slate-200">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="first:border-t first:border-border">
                <PostItem isLoading />
              </li>
            ))
            : latestPosts.map(
              (post) =>
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
            )}
        </ul>

      </section>

    </>
  );
}
