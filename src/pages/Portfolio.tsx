import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { getPortfolioProjects } from "@/utils/mdx";
import { useMemo, useState } from "react";

const Portfolio = () => {
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['portfolio-projects'],
        queryFn: getPortfolioProjects,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const title = project?.title?.toLowerCase() || '';
            const excerpt = project?.excerpt?.toLowerCase() || '';
            return (
                title.includes(searchTerm.toLowerCase()) ||
                excerpt.includes(searchTerm.toLowerCase())
            );
        });
    }, [projects, searchTerm]);

    const totalPages = Math.ceil(filteredProjects.length / pageSize);

    const PAGE_GROUP_SIZE = 5;
    const startPage = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    const paginatedProjects = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredProjects.slice(start, start + pageSize);
    }, [filteredProjects, page]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center text-primary">Loading projects...</div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="max-w-2xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <header className="mb-10">
                    <h1 className="text-3xl font-serif font-light text-primary mb-4">Portfolio</h1>
                    <p className="text-lg text-muted-foreground font-light">
                        Selected works and projects
                    </p>
                    <div className="mt-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search projects..."
                            className="w-full px-4 py-2 border rounded-md border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </header>

                <section className="space-y-8">
                    {paginatedProjects.map((project) => {
                        return (
                            <article
                                key={project.slug}
                                className="p-6 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <Link to={`/portfolio/${project.slug}`} className="block group space-y-4">
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                                        {!loaded && (
                                            <div className="absolute inset-0 bg-muted animate-pulse" />
                                        )}
                                        {project.image && (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                onLoad={() => setLoaded(true)}
                                                className={`w-full h-48 object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-serif text-primary group-hover:text-primary/80 transition-colors">
                                            {project.title}
                                        </h2>
                                        <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground border border-border">
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(project.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-foreground leading-relaxed">{project.excerpt}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </section>


                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="px-3 py-1 rounded-md border text-foreground text-sm bg-card border-border shadow-sm disabled:opacity-40 hover:bg-accent transition-all"
                        >
                            Previous
                        </button>

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                            <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`px-3 py-1 rounded-md border text-sm transition-all shadow-sm ${page === num
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                    : 'text-foreground bg-card border-border hover:bg-accent'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded-md border text-foreground text-sm bg-card border-border shadow-sm disabled:opacity-40 hover:bg-accent transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default Portfolio;
