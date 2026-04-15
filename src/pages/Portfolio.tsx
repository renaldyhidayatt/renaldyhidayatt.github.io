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

const ITEMS_PER_PAGE = 6; // Increased for bento grid
const PAGE_GROUP_SIZE = 5;

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const { ref, isVisible } = useReveal({ threshold: 0.1 });
    
    return (
        <div 
          ref={ref}
          className={`group relative h-full transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: `${(index % 3) * 100}ms` }}
        >
            <Link
                to={`/portfolio/${project.slug}`}
                className="block h-full"
            >
                <article className="relative h-full p-6 glass rounded-3xl border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image Section */}
                    {project.image && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/40 mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Full Case Study
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="relative flex-1 flex flex-col space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(project.tags) && project.tags.slice(0, 3).map((tag: string) => (
                                <span
                                    key={tag}
                                    className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                {project.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {project.excerpt}
                            </p>
                        </div>

                        <div className="pt-4 mt-auto flex items-center justify-between border-t border-border/40">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={project.date}>
                                    {new Date(project.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-tighter">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
        <Layout>
            <main className="max-w-6xl mx-auto px-6 py-20 pb-20 md:pb-0 font-sans">
                <header className="mb-20 space-y-10 text-center">
                    <div className="space-y-4 animate-slide-up">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
                            Selected <span className="text-primary">Works</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A showcase of engineering problems I've solved, 
                            systems I've built, and production-ready architectures I've designed.
                        </p>
                    </div>

                    <div className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search systems by keyword..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-14 pr-6 py-4 glass rounded-2xl border-2 border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-xl shadow-primary/5"
                        />
                    </div>
                </header>
                
                <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {paginatedProjects.length === 0 ? (
                        <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-border">
                            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                No projects match your criteria
                            </h3>
                            <p className="text-muted-foreground">
                                Try searching for different technologies or keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {paginatedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border-2 text-sm font-semibold bg-card border-border disabled:opacity-40 hover:bg-accent"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="hidden sm:flex items-center gap-1">
                            {Array.from(
                                { length: endPage - startPage + 1 },
                                (_, i) => startPage + i
                            ).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`min-w-[40px] px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${page === num
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card border-border hover:bg-accent"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border-2 text-sm font-semibold bg-card border-border disabled:opacity-40 hover:bg-accent"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default Portfolio;
