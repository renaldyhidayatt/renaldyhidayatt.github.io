import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TypeWriter from "@/components/TypeWritter";
import { useReveal } from "@/hooks/use-reveal";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/utils/mdx";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { CSSProperties } from "react";

// ── PostCard with stagger ────────────────────────────────────────────────────
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
            <article className="retro-card relative p-8">
                <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(post.tags) && post.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="retro-badge-neutral group-hover:bg-accent-light">
                                {tag}
                            </span>
                        ))}
                        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readingTime || '5 min'} read
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="line-clamp-2 text-2xl font-black tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-3xl">{post.title}</h3>
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between border-t-2 border-ink pt-5">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <time className="text-xs font-black uppercase tracking-widest" dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-primary transition-all duration-200 group-hover:gap-3">
                            <span>Read Article</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// ── Floating decorative code snippets (sticky-note style) ─────────────────
const FloatingCode = ({ snippet, style }: { snippet: string; style: CSSProperties }) => (
    <div
        className="retro-shadow-sm absolute hidden select-none border-2 border-ink bg-surface px-4 py-3 font-mono text-[10px] leading-relaxed text-primary pointer-events-none xl:block"
        style={style}
    >
        {snippet.split('\n').map((line, i) => (
            <div key={i}>
                {line.startsWith('//') ? <span className="text-muted-foreground">{line}</span>
                : <span>{line}</span>}
            </div>
        ))}
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
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
                {/* Brutalist decorative shapes */}
                <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
                    <div className="absolute left-[8%] top-[20%] size-10 rounded-full border-2 border-ink bg-badge shadow-retro-sm" />
                    <div className="absolute right-[10%] top-[28%] rotate-12 font-black text-5xl text-primary">+</div>
                    <div className="absolute left-[14%] bottom-[24%] size-6 border-2 border-ink bg-secondary shadow-retro-sm" />
                    <div className="absolute bottom-[30%] right-[14%] -rotate-12 font-black text-4xl text-badge">✦</div>
                    <div className="animate-float absolute right-[22%] top-[16%] size-8 border-2 border-ink bg-accent-light shadow-retro-sm" />
                </div>

                {/* Floating code decorations */}
                <FloatingCode
                    snippet={`// system design\nlatency: O(1)\nthroughput: high\nfault: tolerant`}
                    style={{ top: "18%", left: "4%", transform: "rotate(-2deg)" }}
                />
                <FloatingCode
                    snippet={`fn resilient() {\n  retry(3)?;\n  circuit_break()\n}`}
                    style={{ top: "20%", right: "4%", transform: "rotate(2deg)" }}
                />
                <FloatingCode
                    snippet={`SELECT * FROM\n  distributed_sys\nWHERE reliable = true`}
                    style={{ bottom: "25%", left: "3%", transform: "rotate(1.5deg)" }}
                />
                <FloatingCode
                    snippet={`kafka.produce(\n  topic: "events",\n  acks: all\n)`}
                    style={{ bottom: "30%", right: "3%", transform: "rotate(-1.5deg)" }}
                />

                <div className="relative z-10 mx-auto max-w-4xl space-y-12 py-32">
                    <div className="space-y-8">
                        {/* Status badge */}
                        <div className="retro-badge animate-fade-in mx-auto">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-60"></span>
                                <span className="relative inline-flex h-2 w-2 bg-ink"></span>
                            </span>
                            Available for new projects
                        </div>

                        <div className="space-y-2">
                            <h1
                                className="animate-slide-up whitespace-normal text-[clamp(2.6rem,9vw,6.5rem)] font-black leading-[0.95] tracking-[-0.05em] md:whitespace-nowrap"
                                style={{ animationDelay: '0.1s' }}
                            >
                                Renaldy{" "}
                                <span className="retro-highlight inline-block -rotate-2">Hidayat</span>
                            </h1>
                        </div>

                        <div
                            className="animate-slide-up flex flex-col justify-center gap-3 text-lg font-medium text-muted-foreground md:flex-row md:items-center md:text-xl"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <TypeWriter
                                texts={typewriterTexts}
                                speed={70}
                                delay={3000}
                                className="font-bold tracking-tight text-foreground"
                            />
                        </div>
                    </div>

                    <p
                        className="animate-fade-in mx-auto max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
                        style={{ animationDelay: '0.6s' }}
                    >
                        Building resilient{" "}
                        <span className="font-bold text-foreground">backend architectures</span>{" "}
                        and exploring the depths of reliable software engineering.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="animate-slide-up flex flex-wrap items-center justify-center gap-5"
                        style={{ animationDelay: '0.8s' }}
                    >
                        <Link to="/blog" className="retro-btn group">
                            Read My Blog
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link to="/portfolio" className="retro-btn retro-btn-secondary group">
                            View Projects
                            <ArrowRight className="h-4 w-0 opacity-0 transition-all duration-200 group-hover:w-4 group-hover:opacity-100" />
                        </Link>
                    </div>
                </div>

                {/* scroll indicator */}
                <div
                    className="animate-fade-in absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
                    style={{ animationDelay: '1.5s' }}
                >
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">scroll</span>
                    <div className="h-8 w-1.5 animate-pulse bg-badge shadow-retro-sm" />
                </div>
            </section>

            {/* ── Latest posts ── */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-4xl" ref={postsSection.ref}>
                    <div
                        className="mb-12 flex items-end justify-between"
                        style={{
                            opacity: postsSection.isVisible ? 1 : 0,
                            transform: postsSection.isVisible ? "translateY(0)" : "translateY(16px)",
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                        }}
                    >
                        <div>
                            <span className="retro-badge mb-3 inline-flex">Fresh from the terminal</span>
                            <h2 className="text-3xl font-black tracking-tighter text-foreground md:text-4xl">
                                Latest Posts
                            </h2>
                            <p className="mt-1 text-muted-foreground">Recent thoughts and learnings</p>
                        </div>
                        <Link
                            to="/blog"
                            className="group hidden items-center gap-2 text-sm font-black uppercase tracking-wider text-primary sm:inline-flex"
                        >
                            <span className="border-b-2 border-primary pb-0.5 group-hover:bg-accent-light">View All</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="retro-panel h-48 animate-pulse" />
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

                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/blog" className="retro-btn retro-btn-secondary">
                            View All Posts
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
