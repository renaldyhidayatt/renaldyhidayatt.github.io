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
          className={`group h-full transition-[transform,opacity] duration-1000 ease-premium transform-gpu ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
          }`}
          style={{ 
            transitionDelay: `${(index % 4) * 100}ms`,
            willChange: "transform, opacity"
          }}
        >
            <Link
                to={`/blog/${post.slug}`}
                className="block h-full relative"
            >
                <article className="relative h-full p-6 glass-morphism rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-primary/50 transition-[border-color,background-color,box-shadow] duration-500 overflow-hidden flex flex-col">
                    
                    <div className="relative flex-1 flex flex-col px-1">
                        <div className="flex flex-wrap gap-2 items-center mb-6">
                            {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag: string) => (
                                <span
                                    key={tag}
                                    className="text-[8px] px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-900/90 text-foreground dark:text-zinc-300 border border-black/10 dark:border-white/10 font-bold uppercase tracking-widest"
                                >
                                    {tag}
                                </span>
                            ))}
                            <div className="ml-auto flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime || '5 min'} read
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <h2 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                                {post.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="pt-4 mt-auto flex items-center justify-between border-t border-border/50">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest group/btn">
                                <span>Read Full Article</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
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
            <main className="w-full px-8 md:px-12 lg:px-20 py-24 font-sans">
                <header className="mb-20 space-y-10">
                    <div className="space-y-6 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                            <BookOpen className="w-3.5 h-3.5" />
                            Technical Insights
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
                            The <span className="text-primary italic">Journal</span>
                        </h1>
                        <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
                            A collection of technical deep-dives, architectural explorations, and production engineering lessons.
                        </p>
                    </div>

                    <div className="relative w-full max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter by keywords, tags, or system names..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-14 pr-6 py-4 glass-morphism rounded-2xl border border-white/10 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        />
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {paginatedPosts.length === 0 ? (
                        <div className="col-span-full text-center py-20 glass rounded-[40px] border-dashed border-2 border-border">
                            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight">No results found</h3>
                            <p className="text-muted-foreground">Try different keywords or browse all tags.</p>
                        </div>
                    ) : (
                        paginatedPosts.map((post, index) => (
                            <BlogPostCard
                                key={post.slug}
                                post={post}
                                index={index}
                            />
                        ))
                    )}
                </section>

                {totalPages > 1 && (
                    <footer className="flex justify-center items-center gap-3 mt-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="p-4 rounded-2xl glass border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all duration-300"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`w-14 h-14 rounded-2xl font-black text-sm transition-all duration-300 ${
                                        page === num
                                        ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-110'
                                        : 'glass border border-border/50 text-foreground hover:border-primary/50'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="p-4 rounded-2xl glass border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all duration-300"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </footer>
                )}
            </main>
        </Layout>
    );
};

export default Blog;