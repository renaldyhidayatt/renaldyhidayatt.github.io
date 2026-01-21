import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TypeWriter from "@/components/TypeWritter";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/utils/mdx";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const Index = () => {
    const typewriterTexts = [
        "Building backend systems",
        "Learning from production problems",
        "Trying to make things more reliable",
    ];

    const { data: posts, isLoading } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: getBlogPosts,
    });

    return (
        <Layout>
            <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 py-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-7xl font-serif font-light text-foreground mb-6">
                            Renaldy Hidayat
                        </h1>
                        <div className="text-xl md:text-2xl text-muted-foreground h-8 flex items-center justify-center">
                            <TypeWriter
                                texts={typewriterTexts}
                                speed={150}
                                delay={2000}
                                className="text-primary font-medium"
                            />
                        </div>
                    </div>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Notes and reflections on building backend systems, reliability, and engineering trade-offs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            to="/blog"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        >
                            Read My Blog
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/portfolio"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-border text-foreground rounded-lg hover:border-primary hover:bg-accent transition-all duration-200 font-medium"
                        >
                            View Portfolio
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"></div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                                Latest Posts
                            </h2>
                            <p className="text-muted-foreground">
                                Recent thoughts and learnings
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                        >
                            View All
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-48 bg-card/50 rounded-2xl animate-pulse border border-border/50"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts?.slice(0, 5).map((post, index) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    className="group block"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <article className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="relative space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary group-hover:text-primary/80 transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}
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
                                                    <span>{post.readTime || "2 min read"}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2">
                                                <span>Read article</span>
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-12 sm:hidden">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 text-primary border-2 border-border rounded-lg hover:border-primary hover:bg-accent transition-all duration-200 font-medium"
                        >
                            View All Posts
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Index;