import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { getPortfolioProjects } from "@/utils/mdx";
import { useReveal } from "@/hooks/use-reveal";
import {
    Search,
    Calendar,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 8; // Load more items to fill 4 columns nicely
const PAGE_GROUP_SIZE = 5;

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const { ref, isVisible } = useReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`group h-full transition-[transform,opacity] duration-1000 ease-premium transform-gpu ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
                }`}
            style={{
                transitionDelay: `${(index % 4) * 100}ms`,
                willChange: "transform, opacity"
            }}
        >
            <Link
                to={`/portfolio/${project.slug}`}
                className="block h-full relative"
            >
                <article className="relative h-full p-5 glass-morphism rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-primary/50 transition-[border-color,background-color,box-shadow] duration-500 flex flex-col overflow-hidden">

                    {/* Image Section */}
                    {project.image && (
                        <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-black/5 dark:border-white/5 mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                            />
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

                            {/* Tags on Image Corner */}
                            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                                {Array.isArray(project.tags) && project.tags.slice(0, 3).map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-[8px] px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-900/90 text-foreground dark:text-zinc-300 border border-black/10 dark:border-white/10 font-bold uppercase tracking-widest"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="relative flex-1 flex flex-col px-1">
                        <div className="space-y-3 mb-6">
                            <h2 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                                {project.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                                {project.excerpt}
                            </p>
                        </div>

                        <div className="pt-4 mt-auto flex items-center justify-between border-t border-border/50">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={project.date}>
                                    {new Date(project.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                    })}
                                </time>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest group/btn">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};

const Portfolio = () => {
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ["portfolio-projects"],
        queryFn: getPortfolioProjects,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const filteredProjects = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return projects.filter((p) => {
            const title = p?.title?.toLowerCase() || "";
            const excerpt = p?.excerpt?.toLowerCase() || "";
            return title.includes(q) || excerpt.includes(q);
        });
    }, [projects, searchTerm]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

    const paginatedProjects = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProjects, page]);

    const startPage =
        Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
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
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            Portfolio
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
                            Selected <span className="text-primary italic">Works</span>
                        </h1>
                        <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
                            A curation of systems engineering, microservices, and
                            cloud-native solutions I've architected and implemented.
                        </p>
                    </div>

                    <div className="relative animate-fade-in group w-full max-w-xl" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Discover projects by tech stack..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-14 pr-6 py-4 glass-morphism rounded-2xl border border-white/10 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        />
                    </div>
                </header>

                <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {paginatedProjects.length === 0 ? (
                        <div className="text-left py-20 px-10 glass-morphism rounded-[2.5rem] border border-white/5">
                            <h3 className="text-xl font-bold mb-2 text-white">
                                No systems found
                            </h3>
                            <p className="text-zinc-500">
                                Try adjusting your search keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                            {paginatedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center sm:justify-start items-center gap-2 mt-16">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold bg-white/5 text-zinc-400 disabled:opacity-30 hover:bg-white/10 transition-all font-sans"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Prev
                            </button>

                            <div className="hidden sm:flex items-center gap-1.5">
                                {Array.from(
                                    { length: endPage - startPage + 1 },
                                    (_, i) => startPage + i
                                ).map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num)}
                                        className={`min-w-[42px] px-3 py-2.5 rounded-xl border text-[10px] font-black transition-all font-sans ${page === num
                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                            : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold bg-white/5 text-zinc-400 disabled:opacity-30 hover:bg-white/10 transition-all font-sans"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default Portfolio;
