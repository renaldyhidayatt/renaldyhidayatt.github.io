import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import { getBlogPost, getBlogPosts } from "@/utils/mdx";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
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
                <main className="max-w-4xl mx-auto px-6 py-16 font-sans">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-muted-foreground font-medium">
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
                <main className="max-w-4xl mx-auto px-6 py-16 font-sans">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto">
                                <span className="text-4xl">📄</span>
                            </div>

                            <div className="space-y-2">
                                <h1 className="font-serif text-3xl font-semibold text-primary">
                                    Article Not Found
                                </h1>
                                <p className="text-muted-foreground">
                                    The article you're looking for doesn't exist or has been moved.
                                </p>
                            </div>

                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
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
        <Layout>
            <main className="pb-20 md:pb-0">
                <div className="bg-gradient-to-b from-accent/30 via-accent/10 to-transparent border-b border-border">
                    <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">
                        <Link
                            to="/blog"
                            className="font-sans inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Blog
                        </Link>
                        <article>
                            <header className="space-y-6">
                                {post.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 font-sans">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h1 className="font-serif text-4xl md:text-5xl font-semibold text-primary leading-tight">
                                    {post.title}
                                </h1>
                                <div className="font-sans flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </div>

                                    {post.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    )}
                                </div>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <article className="font-serif">
                        <MDXContent code={post.content} />
                    </article>
                    <div className="mt-16 pt-8 border-t border-border space-y-8 font-sans">
                        {randomPosts.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="font-serif text-2xl font-semibold text-primary">
                                    More Articles You Might Like
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {randomPosts.map((randomPost) => (
                                        <Link
                                            key={randomPost.slug}
                                            to={`/blog/${randomPost.slug}`}
                                            className="group block p-5 rounded-lg border border-border bg-card hover:bg-accent transition-all"
                                        >
                                            <div className="space-y-3">
                                                {randomPost.tags?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {randomPost.tags.slice(0, 2).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <h3 className="font-serif text-lg font-semibold text-primary line-clamp-2">
                                                    {randomPost.title}
                                                </h3>

                                                {randomPost.excerpt && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {randomPost.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Calendar className="w-3 h-3" />
                                                    <time dateTime={randomPost.date}>
                                                        {new Date(randomPost.date).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </time>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-lg transition-all font-medium group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Read More Articles
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default BlogPost;
