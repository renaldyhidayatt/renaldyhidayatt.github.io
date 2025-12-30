import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TypeWriter from "@/components/TypeWritter";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/utils/mdx";

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
            <section className="min-h-[80vh] flex flex-col justify-center items-center text-center py-20">
                <div className="mb-8">
                    <h1 className="text-6xl md:text-7xl font-serif font-light text-foreground mb-6">
                        Renaldy Hidayat
                    </h1>
                    <div className="text-xl md:text-2xl text-muted-foreground mb-6 h-8">
                        <TypeWriter
                            texts={typewriterTexts}
                            speed={150}
                            delay={2000}
                            className="text-primary"
                        />
                    </div>
                    <p className="text-lg text-muted-foreground italic font-light max-w-2xl mx-auto">
                        Notes and reflections on building backend systems, reliability, and engineering trade-offs.
                    </p>
                </div>

                <div className="flex gap-6 mt-8">
                    <Link
                        to="/blog"
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium"
                    >
                        Read My Blog
                    </Link>
                    <Link
                        to="/portfolio"
                        className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                    >
                        View Portfolio
                    </Link>
                </div>
            </section>

            <section className="py-20 border-t border-border transition-colors duration-300">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif text-primary mb-12 text-center">
                        Latest Posts
                    </h2>
                    <div className="grid gap-8">
                        <article>
                            {isLoading ? (
                                <div className="h-48 bg-card rounded-xl animate-pulse"></div>
                            ) : (
                                <div className="space-y-8">
                                    {posts?.slice(0, 5).map((post) => (
                                        <Link
                                            key={post.slug}
                                            to={`/blog/${post.slug}`}
                                            className="block p-8 bg-card rounded-xl border border-border hover:bg-accent transition-all duration-300 group"
                                        >
                                            <h3 className="text-xl font-serif text-primary mb-4 transition-colors group-hover:text-primary/80">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-muted-foreground mb-3 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center text-sm space-x-4 text-muted-foreground mb-3">
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
                                            <span className="text-sm text-primary font-medium">
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
                            className="inline-flex items-center px-6 py-3 text-primary border border-primary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                        >
                            View All Posts
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
