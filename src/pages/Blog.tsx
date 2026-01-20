import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { getBlogPosts } from "@/utils/mdx";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 6;

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
                <main className="max-w-5xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-muted-foreground font-medium">Loading articles...</p>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="max-w-5xl mx-auto px-6 py-16 pb-20 md:pb-0">
                <header className="mb-12">
                    <div className="space-y-4 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                            Blog
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Personal thoughts, technical deep-dives, and lessons learned from building systems in production.
                        </p>
                    </div>

                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 border-2 rounded-xl border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>
                    {searchTerm && (
                        <p className="mt-4 text-sm text-muted-foreground">
                            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </header>
                <section className="space-y-6">
                    {paginatedPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground">Try adjusting your search terms</p>
                        </div>
                    ) : (
                        paginatedPosts.map((post, index) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="group block"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <article className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="relative space-y-4">
                                        {Array.isArray(post.tags) && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            <h2 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-muted-foreground leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                <time dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readTime || '5 min read'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-primary pt-2">
                                            <span>Read article</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </section>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border-2 text-foreground text-sm font-semibold bg-card border-border hover:bg-accent hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:border-border"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="hidden sm:flex items-center gap-1">
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`min-w-[40px] px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${page === num
                                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                                        : 'text-foreground bg-card border-border hover:bg-accent hover:border-primary/30'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <div className="sm:hidden px-4 py-2 rounded-lg bg-accent text-sm font-semibold text-foreground">
                            {page} / {totalPages}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border-2 text-foreground text-sm font-semibold bg-card border-border hover:bg-accent hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:border-border"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default Blog;