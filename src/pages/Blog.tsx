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
                    <div className="text-center text-muted-foreground">Loading posts...</div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>

            <main className="max-w-2xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <header className="mb-10">
                    <h1 className="text-3xl font-serif font-light text-primary mb-2">Blog</h1>
                    <p className="text-lg text-muted-foreground font-light">
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
                            className="w-full px-4 py-2 border rounded-md border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </header>

                <section className="space-y-8">
                    {paginatedPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="p-6 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Link to={`/blog/${post.slug}`} className="block group">
                                <h2 className="text-xl font-serif mb-3 transition-colors text-primary group-hover:text-primary/80">
                                    {post.title}
                                </h2>

                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-sm space-x-4 text-muted-foreground mb-2">
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
                                                className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground border border-border"
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
                            className="px-3 py-1 rounded-md border text-foreground text-sm bg-card border-border shadow-sm disabled:opacity-40 hover:bg-accent transition-all"
                        >
                            Previous
                        </button>

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                            <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`px-3 py-1 rounded-md border text-sm transition-all shadow-sm ${page === num
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                    : 'text-foreground bg-card border-border hover:bg-accent'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded-md border text-foreground text-sm bg-card border-border shadow-sm disabled:opacity-40 hover:bg-accent transition-all"
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
