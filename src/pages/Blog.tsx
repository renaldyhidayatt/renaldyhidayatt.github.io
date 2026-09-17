import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { getBlogPosts } from "@/utils/mdx";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const POSTS_PER_PAGE = 8; // Match portfolio Items Per Page for 4-columns

const BlogPostCard = ({ post, index }: { post: any; index: number }) => {
    const { ref, isVisible } = useReveal({ threshold: 0.1 });
    
    return (
        <div 
          ref={ref}
          className={`group h-full transition-[transform,opacity] duration-500 transform-gpu ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ 
            transitionDelay: `${(index % 4) * 80}ms`,
          }}
        >
            <Link
                to={`/blog/${post.slug}`}
                className="block h-full relative"
            >
                <article className="retro-card relative h-full p-6 flex flex-col justify-between overflow-hidden">
                    <div className="relative flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 items-center mb-5">
                            {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag: string) => (
                                <span
                                    key={tag}
                                    className="text-[9px] px-2 py-0.5 border border-ink bg-badge font-mono font-black uppercase tracking-wider text-badge-ink shadow-retro-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                            <div className="ml-auto flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime || '5 min'} read
                            </div>
                        </div>

                        <div className="space-y-2 mb-5">
                            <h2 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                                {post.title}
                            </h2>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="pt-3 mt-auto flex items-center justify-between border-t-2 border-ink">
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                            <span className="text-xs font-black uppercase text-primary group-hover:translate-x-0.5 transition-transform">
                                Read &rarr;
                            </span>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};

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
            const tags = Array.isArray(post?.tags) ? post.tags.join(' ').toLowerCase() : '';
            return title.includes(searchTerm.toLowerCase()) || 
                   excerpt.includes(searchTerm.toLowerCase()) ||
                   tags.includes(searchTerm.toLowerCase());
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

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-6xl mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout maxWidth="w-full">
            <main className="w-full px-6 md:px-12 lg:px-16 py-16 font-mono">
                <header className="mb-14 space-y-8">
                    <div className="space-y-4 animate-slide-up">
                        <div className="retro-badge inline-flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5" />
                            Technical Notes
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                            The <span className="text-primary italic">Journal</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                            A collection of technical write-ups, systems studies, and engineering explorations.
                        </p>
                    </div>

                    <div className="relative w-full max-w-xl animate-fade-in group" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                        <input
                            type="text"
                            placeholder="Filter by keyword, tag, or topic..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-2.5 border-2 border-ink bg-surface text-foreground placeholder:text-muted-foreground shadow-retro-sm focus:outline-none focus:shadow-retro font-mono text-xs md:text-sm transition-all"
                        />
                    </div>
                </header>

                <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {paginatedPosts.length === 0 ? (
                        <div className="text-left py-16 px-8 retro-card border-2 border-ink shadow-retro">
                            <h3 className="text-xl font-black mb-2 text-foreground">No notes found</h3>
                            <p className="text-sm text-muted-foreground">Try different search keywords or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                            {paginatedPosts.map((post, index) => (
                                <BlogPostCard
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <footer className="flex justify-center items-center gap-2 mt-16 font-mono animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                aria-label="Previous page"
                                className="p-3 border-2 border-ink bg-surface text-foreground shadow-retro-sm hover:bg-accent-light hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num)}
                                        className={`w-11 h-11 border-2 border-ink font-mono font-black text-sm flex items-center justify-center transition-all ${
                                            page === num
                                            ? 'bg-badge text-badge-ink shadow-retro -translate-y-0.5'
                                            : 'bg-surface text-foreground shadow-retro-sm hover:bg-accent-light hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                aria-label="Next page"
                                className="p-3 border-2 border-ink bg-surface text-foreground shadow-retro-sm hover:bg-accent-light hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </footer>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default Blog;