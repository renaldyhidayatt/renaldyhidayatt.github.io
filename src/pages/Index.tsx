import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TypeWriter from "@/components/TypeWritter";
import { useReveal } from "@/hooks/use-reveal";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/utils/mdx";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// ── PostCard with stagger + hover glow ───────────────────────────────────────
function PostCard({
    post,
    index,
    visible,
}: {
    post: any;
    index: number;
    visible: boolean;
}) {
    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group block relative"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: `${index * 150}ms`,
            }}
        >
            <article className="overflow-hidden glass rounded-[32px] border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-primary/5">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(post.tags) && post.tags.slice(0, 2).map((tag: string) => (
                            <span
                                key={tag}
                                className="text-[10px] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-black uppercase tracking-widest"
                            >
                                {tag}
                            </span>
                        ))}
                        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime || '5 min'} read
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm md:text-base">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-border/40">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <time className="text-xs font-bold uppercase tracking-widest" dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-tighter group-hover:gap-3 transition-all">
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// ── MeshBackground (Sleek, ethereal background) ───────────────────────────
const MeshBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute top-[-25%] left-[-10%] w-[80%] h-[80%] bg-primary/[0.08] rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-[-25%] right-[-10%] w-[80%] h-[80%] bg-blue-500/[0.05] rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '25s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-soft-light pointer-events-none"></div>
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
);


// ── Main page ─────────────────────────────────────────────────────────────────
const Index = () => {
    const typewriterTexts = [
        "Building backend systems",
        "Learning from production problems",
        "Trying to make things more reliable",
    ];

    const postsSection = useReveal();

    const { data: posts, isLoading } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: getBlogPosts,
    });

    return (
        <Layout maxWidth="w-full">
            {/* ── Hero ── */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden text-center">
                <MeshBackground />

                <div className="relative z-10 max-w-4xl mx-auto space-y-12 py-32">
                    <div className="space-y-8">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.03] border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] animate-fade-in"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            Available for new projects
                        </div>

                        <div className="space-y-2">
                            <h1
                                className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] animate-slide-up"
                                style={{ animationDelay: '0.1s' }}
                            >
                                Renaldy<br />
                                <span className="text-primary italic opacity-90">Hidayat</span>
                            </h1>
                        </div>

                        <div
                            className="text-lg md:text-xl text-muted-foreground/80 font-medium animate-slide-up flex flex-col md:flex-row md:items-center justify-center gap-3"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <TypeWriter
                                texts={typewriterTexts}
                                speed={70}
                                delay={3000}
                                className="text-foreground font-semibold tracking-tight"
                            />
                        </div>
                    </div>

                    <p
                        className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in opacity-70"
                        style={{ animationDelay: '0.6s' }}
                    >
                        Building resilient <span className="text-foreground font-semibold">backend architectures</span> and exploring the depths of reliable software engineering.
                    </p>

                    <div
                        className="flex flex-wrap items-center justify-center gap-6 animate-slide-up"
                        style={{ animationDelay: '0.8s' }}
                    >
                        <Link
                            to="/blog"
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-full hover:scale-105 active:scale-[0.98] transition-all duration-500 font-bold text-xs uppercase tracking-widest"
                        >
                            Read My Blog
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/portfolio"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-border rounded-full hover:bg-foreground/5 hover:scale-105 active:scale-[0.98] transition-all duration-500 font-bold text-xs uppercase tracking-widest"
                        >
                            View Projects
                        </Link>
                    </div>
                </div>

                {/* scroll indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in hidden md:block"
                    style={{ animationDelay: '1.5s' }}
                >
                    <div className="w-5 h-8 border border-primary/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm">
                        <div className="w-1 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* ── Latest posts ── */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
                <div className="max-w-4xl mx-auto" ref={postsSection.ref}>
                    <div
                        className="flex items-center justify-between mb-12"
                        style={{
                            opacity: postsSection.isVisible ? 1 : 0,
                            transform: postsSection.isVisible ? "translateY(0)" : "translateY(16px)",
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                        }}
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                                Latest Posts
                            </h2>
                            <p className="text-muted-foreground">Recent thoughts and learnings</p>
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
                                <div key={i} className="h-48 bg-card/50 rounded-2xl animate-pulse border border-border/50" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts?.slice(0, 5).map((post, index) => (
                                <PostCard
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                    visible={postsSection.isVisible}
                                />
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

            {/* ── Global keyframes (injected once) ── */}
            <style>{`
                @keyframes heroFadeDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes particleFloat {
                    0%   { transform: translateY(0)   scale(1);   opacity: 0; }
                    15%  { opacity: 1; }
                    85%  { opacity: 0.4; }
                    100% { transform: translateY(-110vh) scale(0.4); opacity: 0; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50%       { transform: translateX(-50%) translateY(-6px); }
                }
            `}</style>
        </Layout>
    );
};

export default Index;