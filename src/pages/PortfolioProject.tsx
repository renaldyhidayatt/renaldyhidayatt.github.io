import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import { getPortfolioProject, getPortfolioProjects } from "@/utils/mdx";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";

const statusColors: Record<string, string> = {
    "Complete": "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
    "Completed": "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
    "In Progress": "bg-amber-500/15 text-amber-600 border-amber-500/20",
    "Active": "bg-blue-500/15 text-blue-600 border-blue-500/20",
};

const PortfolioProject = () => {
    const { slug } = useParams();

    const { data: project, isLoading, error } = useQuery({
        queryKey: ['portfolio-project', slug],
        queryFn: () => getPortfolioProject(slug!),
        enabled: !!slug,
    });

    const { data: allProjects = [] } = useQuery({
        queryKey: ['portfolio-projects'],
        queryFn: getPortfolioProjects,
    });

    const latestProjects = useMemo(() => {
        if (!project || allProjects.length === 0) return [];
        const otherProjects = allProjects.filter(p => p.slug !== slug);
        return otherProjects.slice(0, 3);
    }, [allProjects, slug, project]);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground font-medium">Loading project...</p>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    if (error || !project) {
        return (
            <Layout>
                <main className="max-w-[720px] mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="text-6xl">💼</div>
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-foreground">Project Not Found</h1>
                                <p className="text-muted-foreground text-sm">
                                    The project you're looking for doesn't exist or has been moved.
                                </p>
                            </div>
                            <Link
                                to="/portfolio"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Portfolio
                            </Link>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    const statusColor = statusColors[project.status] || "bg-accent text-foreground border-border";

    return (
        <Layout maxWidth="max-w-screen-2xl">
            <ReadingProgress />
            <main className="pb-20 md:pb-0">
                {/* ── Project Header ─────────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 pt-12">
                    <div className="max-w-[720px]">
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            Back to Portfolio
                        </Link>

                        <header className="space-y-5 pb-10">
                            {/* Status badge */}
                            <span className={`inline-flex px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border ${statusColor}`}>
                                {project.status}
                            </span>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                                {project.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-lg text-muted-foreground leading-relaxed font-serif max-w-[600px]">
                                {project.excerpt}
                            </p>

                            {/* Tech Stack */}
                            <div className="pt-2 space-y-3">
                                <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-[13px] font-semibold rounded-xl bg-accent text-foreground border border-border hover:border-primary/30 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </header>

                        {/* Divider */}
                        <div className="h-px bg-border" />
                    </div>
                </div>

                {/* ── Project Body & TOC ────────────────────────── */}
                <div className="max-w-screen-xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24 xl:gap-32">
                    <article className="max-w-[720px] w-full">
                        <MDXContent code={project.content} />
                    </article>

                    {/* TOC Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 pl-8 border-l border-border/10">
                            <TableOfContents toc={project.toc} />
                        </div>
                    </aside>
                </div>

                {/* ── Related Projects ─────────────────────────── */}
                <div className="max-w-[960px] mx-auto px-6 mt-20">
                    <div className="h-px bg-border mb-14" />

                    {latestProjects.length > 0 && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                    Explore More
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {latestProjects.map((latestProject) => {
                                    const projColor = statusColors[latestProject.status] || "bg-accent text-foreground border-border";
                                    return (
                                        <Link
                                            key={latestProject.slug}
                                            to={`/portfolio/${latestProject.slug}`}
                                            className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${projColor}`}>
                                                        {latestProject.status}
                                                    </span>
                                                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>

                                                <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                    {latestProject.title}
                                                </h3>

                                                {latestProject.excerpt && (
                                                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                                                        {latestProject.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {latestProject.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent text-muted-foreground"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    <div className="mt-12 mb-8">
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/70 text-foreground rounded-xl transition-colors text-sm font-semibold group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            All Projects
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default PortfolioProject;