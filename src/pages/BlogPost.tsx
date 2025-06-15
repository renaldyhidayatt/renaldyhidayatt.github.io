import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MDXContent from "@/components/MDXContent";
import { getBlogPost } from "@/utils/mdx";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center text-gray-500 dark:text-gray-400">Loading post...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-amber-600 dark:text-blue-200 mb-4">
              Post Not Found
            </h1>
            <Link
              to="/blog"
              className="text-amber-600 hover:text-amber-800 dark:text-blue-300 dark:hover:text-blue-100 underline"
            >
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to="/blog"
          className="text-amber-600 hover:text-amber-800 dark:text-blue-300 dark:hover:text-blue-100 text-sm mb-8 inline-block transition-colors"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-12">
            <h1 className="text-3xl font-serif font-light text-amber-600 dark:text-blue-200 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-blue-900 text-amber-700 dark:text-blue-200 border border-amber-400 dark:border-blue-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <MDXContent code={post.content} />
        </article>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
