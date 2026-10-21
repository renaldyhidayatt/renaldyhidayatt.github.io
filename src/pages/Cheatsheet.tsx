import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { getCheatsheets } from "@/utils/mdx";
import { Search, BookMarked, Calendar, Tag, ArrowRight, Flame, FileCode2, ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const ITEMS_PER_PAGE = 8; // Match blog & portfolio: 4 columns
const PAGE_GROUP_SIZE = 5;

const CheatsheetCard = ({ sheet, index }: { sheet: any; index: number }) => {
    const { ref, isVisible } = useReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`group h-full transition-[transform,opacity] duration-500 transform-gpu ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${(index % 4) * 80}ms` }}
        >
            <Link to={`/cheatsheet/${sheet.slug}`} className="block h-full relative">
                <article className="retro-card relative h-full p-5 flex flex-col justify-between overflow-hidden">
                    <div className="relative flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            {sheet.version && (
                                <span className="text-[9px] px-2 py-0.5 border-2 border-ink bg-primary text-primary-foreground font-mono font-black uppercase tracking-wider shadow-retro-sm">
                                    {sheet.version}
                                </span>
                            )}
                            {sheet.status === "verified" && (
                                <span className="text-[9px] px-2 py-0.5 border-2 border-ink bg-secondary text-secondary-foreground font-mono font-black uppercase tracking-wider shadow-retro-sm inline-flex items-center gap-1">
                                    <Flame className="w-2.5 h-2.5" />
                                    Verified
                                </span>
                            )}
                        </div>

                        <div className="space-y-2 mb-4">
                            <h2 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                                {sheet.title}
                            </h2>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {sheet.description}
                            </p>
                        </div>

                        {Array.isArray(sheet.tags) && sheet.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {sheet.tags.slice(0, 4).map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] px-2 py-0.5 border border-ink bg-badge font-mono font-black uppercase tracking-wider text-badge-ink"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="pt-3 mt-auto flex items-center justify-between border-t-2 border-ink">
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={sheet.updated_at ?? sheet.date}>
                                    {new Date(sheet.updated_at ?? sheet.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                    })}
                                </time>
                            </div>
                            <span className="text-xs font-black uppercase text-primary group-hover:translate-x-0.5 transition-transform">
                                Open &rarr;
                            </span>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};

const Cheatsheet = () => {
    const { data: sheets = [], isLoading } = useQuery({
        queryKey: ["cheatsheets"],
        queryFn: getCheatsheets,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const allTags = useMemo(() => {
        const counts = new Map<string, number>();
        sheets.forEach((s) => (s.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map((e) => e[0]);
    }, [sheets]);

    const toggleTag = (tag: string) =>
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );

    const filtered = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return sheets.filter((sheet) => {
            const haystack = [sheet.title, sheet.description, sheet.version || "", (sheet.tags || []).join(" ")]
                .join(" ")
                .toLowerCase();
            const matchesSearch = !q || haystack.includes(q);
            const matchesTags =
                selectedTags.length === 0 ||
                (sheet.tags || []).some((t) => selectedTags.includes(t));
            return matchesSearch && matchesTags;
        });
    }, [sheets, searchTerm, selectedTags]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const startPage = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    // filters changed -> back to the first page
    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedTags]);

    // keep the page valid after the result count changes (e.g. a tag is removed)
    useEffect(() => {
        if (totalPages > 0 && page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-6xl mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="w-16 h-16 border-4 border-primary/20 rounded-full border-t-primary animate-spin" />
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
                            <BookMarked className="w-3.5 h-3.5" />
                            Reference Desk
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                            The <span className="text-primary italic">Cheatsheet</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                            Version-pinned backend reference notes — copy-ready snippets, lookup tables,
                            and pitfalls I've already hit. Rewritten whenever I forget, not every
                            time I publish an article.
                        </p>
                    </div>

                    <div className="relative w-full max-w-xl animate-fade-in group" style={{ animationDelay: "0.2s" }}>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                        <input
                            type="text"
                            placeholder="Search topics, versions, or tags... (e.g. kafka, grpc, postgres)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 border-2 border-ink bg-surface text-foreground placeholder:text-muted-foreground shadow-retro-sm focus:outline-none focus:shadow-retro font-mono text-xs md:text-sm transition-all"
                        />
                    </div>

                    {allTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mr-1 inline-flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                Filter tags:
                            </span>
                            {allTags.map((tag) => {
                                const active = selectedTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`text-[10px] px-2.5 py-1 border-2 border-ink font-mono font-black uppercase tracking-wider transition-all ${
                                            active
                                                ? "bg-badge text-badge-ink shadow-retro -translate-y-0.5"
                                                : "bg-surface text-foreground shadow-retro-sm hover:bg-accent-light hover:shadow-retro hover:-translate-y-0.5"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                            {selectedTags.length > 0 && (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className="text-[10px] px-2.5 py-1 border-2 border-ink bg-surface text-muted-foreground font-mono font-black uppercase tracking-wider hover:bg-accent-light"
                                >
                                    Clear ✕
                                </button>
                            )}
                        </div>
                    )}
                </header>

                <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    {filtered.length === 0 ? (
                        <div className="text-left py-16 px-8 retro-card border-2 border-ink shadow-retro">
                            <h3 className="text-xl font-black mb-2 text-foreground">No sheets found</h3>
                            <p className="text-sm text-muted-foreground">
                                Try a different keyword — or check back later, new cheatsheets are on the way.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                            {paginated.map((sheet, index) => (
                                <CheatsheetCard key={sheet.slug} sheet={sheet} index={index} />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <footer className="flex justify-center items-center gap-2 mt-16 font-mono animate-fade-in" style={{ animationDelay: "0.4s" }}>
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
                                        aria-current={page === num ? "page" : undefined}
                                        className={`w-11 h-11 border-2 border-ink font-mono font-black text-sm flex items-center justify-center transition-all ${
                                            page === num
                                            ? "bg-badge text-badge-ink shadow-retro -translate-y-0.5"
                                            : "bg-surface text-foreground shadow-retro-sm hover:bg-accent-light hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0"
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

                <section className="mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="retro-card border-2 border-ink shadow-retro p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                            <div className="space-y-2">
                                <div className="retro-badge inline-flex items-center gap-2">
                                    <FileCode2 className="w-3.5 h-3.5" />
                                    How it works
                                </div>
                                <h2 className="text-xl font-black text-foreground">
                                    Blog explains <em className="text-primary">why</em>, cheatsheets remember{" "}
                                    <em className="text-primary">how</em>.
                                </h2>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                    Every sheet pins its version at the top. If that version no longer
                                    matches what I run, the sheet is marked stale — rather than quietly
                                    rewritten.
                                </p>
                            </div>
                            <Link
                                to="/blog"
                                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5"
                                style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))" }}
                            >
                                Read the Blog
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Cheatsheet;
