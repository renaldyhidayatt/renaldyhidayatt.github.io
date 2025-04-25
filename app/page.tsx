"use client"
import { sortPosts } from "@/lib/utils";
import { posts } from "@/.velite";
import { PostItem } from "@/components/post-item";
import HomeHeader from "@/components/header-home";
import { useEffect, useState } from "react";
import { SparklesCore } from "@/components/sparkles";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const latestPosts = sortPosts(posts).slice(0, 5);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-background text-foreground">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="absolute inset-0 w-full h-full"
        />
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
        {scrolled && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 rounded-full shadow-md z-40"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}
      </section>

    </>
  );
}
