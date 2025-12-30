import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
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
            <Layout>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center text-muted-foreground">Loading post...</div>
                </main>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif text-primary mb-4">
                            Post Not Found
                        </h1>
                        <Link
                            to="/blog"
                            className="text-primary hover:text-primary/80 underline transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="max-w-2xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <Link
                    to="/blog"
                    className="text-primary hover:text-primary/80 text-sm mb-8 inline-block transition-colors"
                >
                    ← Back to Blog
                </Link>

                <article>
                    <header className="mb-12">
                        <h1 className="text-3xl font-serif font-light text-primary mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
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
                                        className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground border border-border"
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
        </Layout>
    );
};

export default BlogPost;
