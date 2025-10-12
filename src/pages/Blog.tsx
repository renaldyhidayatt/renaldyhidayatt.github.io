import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { getBlogPosts } from "@/utils/mdx";

const POSTS_PER_PAGE = 5;

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post?.title?.toLowerCase() || '';
      const excerpt = post?.excerpt?.toLowerCase() || '';
      return title.includes(searchTerm.toLowerCase()) || excerpt.includes(searchTerm.toLowerCase());
    });
  }, [posts, searchTerm]);


  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const PAGE_GROUP_SIZE = 5;
  const startPage = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading) {
    return (
      <Layout>
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center text-gray-400">Loading posts...</div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>

      <main className="max-w-2xl mx-auto px-6 py-12 pb-20 md:pb-0">
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-light text-amber-500 dark:text-blue-200 mb-2">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
            Personal thoughts and technical notes
          </p>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </header>

        <section className="space-y-12">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="border-b pb-12 last:border-b-0 border-amber-600 dark:border-blue-200"
            >
              <Link to={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-serif mb-3 transition-colors text-amber-600 group-hover:text-amber-900 dark:text-blue-200 dark:group-hover:text-blue-300">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm space-x-4 text-gray-500 dark:text-gray-400 mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime || '2 min read'}</span>
                </div>
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
              </Link>
            </article>
          ))}
        </section>


        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 rounded border text-amber-600 dark:text-blue-200 text-sm bg-white-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded border text-sm ${page === num
                  ? 'bg-amber-600 text-white dark:bg-blue-200 dark:text-gray-900'
                  : 'text-amber-600 dark:text-blue-200 bg-gray-100 dark:bg-gray-800'
                  } border-gray-300 dark:border-gray-600`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border text-amber-600 dark:text-blue-200 text-sm bg-white-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Blog;
