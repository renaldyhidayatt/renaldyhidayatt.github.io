import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import { getCheatsheet, getCheatsheets } from "@/utils/mdx";
import { Calendar, ArrowLeft, Flame, Tag, BookMarked, Layers } from "lucide-react";
import { useMemo } from "react";

const CheatsheetDoc = () => {
    const params = useParams();
    // "/cheatsheet/*" — wildcard so nested sheets (e.g. languages/zig) still resolve
    const slug = params["*"];

    const { data: sheet, isLoading, error } = useQuery({
        queryKey: ["cheatsheet", slug],
        queryFn: () => getCheatsheet(slug!),
        enabled: !!slug,
    });

    const { data: allSheets = [] } = useQuery({
        queryKey: ["cheatsheets"],
        queryFn: getCheatsheets,
    });

    const siblings = useMemo(() => {
        if (!sheet) return [];
        const wanted = new Set((sheet.tags || []).map((t) => t.toLowerCase()));
        return allSheets
            .filter((s) => s.slug !== sheet.slug)
            .map((s) => ({
                s,
                overlap: (s.tags || []).filter((t) => wanted.has(t.toLowerCase())).length,
            }))
            .filter((x) => x.overlap > 0)
            .sort((a, b) => b.overlap - a.overlap)
            .slice(0, 3)
            .map((x) => x.s);
    }, [allSheets, sheet]);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground font-medium">Loading sheet...</p>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    if (error || !sheet) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="text-6xl">🗒️</div>
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-foreground">Sheet Not Found</h1>
                                <p className="text-muted-foreground text-sm">
                                    The cheatsheet you're looking for doesn't exist or has moved.
                                </p>
                            </div>
                            <Link
                                to="/cheatsheet"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Cheatsheet
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
                {/* ── Header ──────────────────────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 pt-12">
                    <div className="max-w-[720px]">
                        <Link
                            to="/cheatsheet"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            Back to Cheatsheet
                        </Link>

                        <header className="space-y-5 pb-10">
                            <div className="flex flex-wrap gap-2">
                                {sheet.version && (
                                    <span
                                        className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-primary text-primary-foreground border-2 border-border"
                                        style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
                                    >
                                        {sheet.version}
                                    </span>
                                )}
                                {sheet.status === "verified" && (
                                    <span
                                        className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-secondary text-secondary-foreground border-2 border-border inline-flex items-center gap-1.5"
                                        style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
                                    >
                                        <Flame className="w-3 h-3" />
                                        Verified Snippet
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                                {sheet.title}
                            </h1>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {sheet.description}
                            </p>

                            {Array.isArray(sheet.tags) && sheet.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        Tags:
                                    </span>
                                    {sheet.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-accent text-accent-foreground border-2 border-border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground font-medium pt-2">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <time dateTime={sheet.updated_at ?? sheet.date}>
                                        {new Date(sheet.updated_at ?? sheet.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </div>
                        </header>

                        <div className="h-[3px] bg-border mt-10" />
                    </div>
                </div>

                {/* ── Body & TOC ──────────────────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24 xl:gap-32">
                    <article className="max-w-[720px] w-full">
                        <MDXContent code={sheet.content} />
                    </article>

                    <aside className="hidden lg:block">
                        <div className="sticky top-32">
                            <TableOfContents toc={sheet.toc} />
                        </div>
                    </aside>
                </div>

                {/* ── Related sheets ───────────────────────────────────── */}
                {siblings.length > 0 && (
                    <div className="max-w-[960px] mx-auto px-6 mt-20">
                        <div className="h-[3px] bg-border mb-14" />

                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span
                                    className="text-[10px] font-black uppercase tracking-widest text-foreground px-2 py-0.5"
                                    style={{
                                        border: "2px solid hsl(var(--border))",
                                        background: "hsl(var(--foreground))",
                                        color: "hsl(var(--background))",
                                    }}
                                >
                                    <span className="inline-flex items-center gap-1.5">
                                        <Layers className="w-3 h-3" />
                                        Related Sheets
                                    </span>
                                </span>
                                <div className="h-[2px] flex-1 bg-border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {siblings.map((s: any) => (
                                    <Link
                                        key={s.slug}
                                        to={`/cheatsheet/${s.slug}`}
                                        className="group block p-5 bg-card transition-all duration-150 hover:-translate-y-0.5"
                                        style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))" }}
                                    >
                                        <div className="space-y-3">
                                            {s.version && (
                                                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-primary text-primary-foreground">
                                                    {s.version}
                                                </span>
                                            )}
                                            <h3
                                                className="text-base font-black text-foreground line-clamp-2 uppercase"
                                                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
                                            >
                                                {s.title}
                                            </h3>
                                            <p
                                                className="text-[12px] text-muted-foreground line-clamp-3 leading-relaxed"
                                                style={{ fontFamily: "var(--font-mono)" }}
                                            >
                                                {s.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                <div className="max-w-[960px] mx-auto px-6 mt-12 mb-8">
                    <Link
                        to="/cheatsheet"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-black uppercase tracking-wider transition-all"
                        style={{ fontFamily: "var(--font-mono)", border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))" }}
                    >
                        <BookMarked className="w-4 h-4" />
                        All Cheatsheets
                    </Link>
                </div>
            </main>
        </Layout>
    );
};

export default CheatsheetDoc;
