import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypeWriter from "@/components/TypeWritter";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/utils/mdx";

const Index = () => {
  const typewriterTexts = [
    "Software Engineer",
    "Full-Stack Developer",
    "Tech Enthusiast",
    "Problem Solver"
  ];

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6">
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center py-20">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-serif font-light text-gray-700 dark:text-gray-200 mb-6">
              Renaldy Hidayat
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 h-8">
              <TypeWriter
                texts={typewriterTexts}
                speed={150}
                delay={2000}
                className="text-amber-500 dark:text-blue-300"
              />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic font-light max-w-2xl mx-auto">
              Tech experiments, lessons, and reflections—carefully crafted by a mind that never stops learning.
            </p>
          </div>

          <div className="flex gap-6 mt-8">
            <Link
              to="/blog"
              className="px-8 py-3 bg-amber-600 text-white dark:text-gray-900 dark:bg-blue-200 rounded-lg hover:bg-amber-900 dark:hover:bg-blue-300 transition-colors font-medium"
            >
              Read My Blog
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3 border border-amber-800 dark:border-blue-200 text-amber-800 dark:text-blue-200 rounded-lg hover:bg-amber-100 hover:text-gray-900 dark:hover:bg-blue-200 dark:hover:text-gray-900 transition-colors font-medium"
            >
              View Portfolio
            </Link>
          </div>
        </section>


        <section className="py-20 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-amber-500 dark:text-blue-200 mb-12 text-center">
              Latest Posts
            </h2>
            <div className="grid gap-8">
              <article>
                {isLoading ? (
                  <div className="h-48 bg-amber-300 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                ) : (
                  <div className="space-y-8">
                    {posts?.slice(0, 5).map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="block p-8 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-amber-100 dark:hover:bg-gray-700/60 hover:border-amber-500/30 dark:hover:border-blue-200/30 transition-all duration-300"
                      >
                        <h3 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4 transition-colors group-hover:text-amber-700 dark:group-hover:text-blue-300">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-sm space-x-4 text-gray-500 dark:text-gray-400 mb-3">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <span>•</span>
                          <span>{post.readTime || "2 min read"}</span>
                        </div>

                        <span className="text-sm text-amber-500 dark:text-blue-300 font-medium">
                          Read more →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </article>

            </div>

            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 text-amber-500 dark:text-blue-300 border border-amber-500 dark:border-blue-300 rounded-lg hover:bg-amber-200 dark:hover:bg-blue-200 hover:text-amber-900 dark:hover:text-gray-900 transition-colors font-medium"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
