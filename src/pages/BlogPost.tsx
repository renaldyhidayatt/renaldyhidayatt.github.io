import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import { getBlogPost, getBlogPosts } from "@/utils/mdx";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

const BlogPost = () => {
    const { slug } = useParams();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["blog-post", slug],
        queryFn: () => getBlogPost(slug!),
        enabled: !!slug,
    });

    const { data: allPosts = [] } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: getBlogPosts,
    });

    const randomPosts = useMemo(() => {
        if (!post || allPosts.length === 0) return [];
        const otherPosts = allPosts.filter((p) => p.slug !== slug);
        return [...otherPosts].sort(() => Math.random() - 0.5).slice(0, 3);
    }, [allPosts, slug, post]);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground font-medium">
                                Loading article...
                            </p>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="text-6xl">📄</div>
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-foreground">
                                    Article Not Found
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    The article you're looking for doesn't exist or has been moved.
                                </p>
                            </div>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout maxWidth="max-w-screen-2xl">
            <ReadingProgress />
            <main className="pb-20 md:pb-0">
                {/* ── Article Header ──────────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 pt-12">
                    <div className="max-w-[720px]">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            Back to Blog
                        </Link>

                        <header className="space-y-5 pb-10">
                            {/* Tags */}
                            {post.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-accent text-muted-foreground border border-border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                                {post.title}
                            </h1>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                                {post.readTime && (
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{post.readTime}</span>
                                    </div>
                                )}
                            </div>
                        </header>
                        
                        {/* Divider */}
                        <div className="h-px bg-border mt-10" />
                    </div>
                </div>

                {/* ── Article Body & TOC ────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24 xl:gap-32">
                    <article className="max-w-[720px] w-full space-y-12">
                        {/* Hero Image */}
                        {post.image && (
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border shadow-2xl transition-all duration-700 hover:shadow-primary/10">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                            </div>
                        )}
                        <MDXContent code={post.content} />
                    </article>

                    {/* TOC Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 pl-8 border-l border-border/10">
                            <TableOfContents toc={post.toc} />
                        </div>
                    </aside>
                </div>

                {/* ── Related Articles ─────────────────────────── */}
                <div className="max-w-[960px] mx-auto px-6 mt-20">
                    <div className="h-px bg-border mb-14" />

                    {randomPosts.length > 0 && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                    Continue Reading
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {randomPosts.map((randomPost) => (
                                    <Link
                                        key={randomPost.slug}
                                        to={`/blog/${randomPost.slug}`}
                                        className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="space-y-3">
                                            {randomPost.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {randomPost.tags.slice(0, 2).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent text-muted-foreground"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                {randomPost.title}
                                            </h3>

                                            {randomPost.excerpt && (
                                                <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {randomPost.excerpt}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                <time dateTime={randomPost.date}>
                                                    {new Date(randomPost.date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-12 mb-8">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/70 text-foreground rounded-xl transition-colors text-sm font-semibold group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            All Articles
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default BlogPost;
