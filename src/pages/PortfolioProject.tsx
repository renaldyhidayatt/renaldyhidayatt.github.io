import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import { getPortfolioProject, getPortfolioProjects } from "@/utils/mdx";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";

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
                <main className="max-w-4xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-muted-foreground font-medium">Loading project...</p>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    if (error || !project) {
        return (
            <Layout>
                <main className="max-w-4xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto">
                                <span className="text-4xl">💼</span>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-serif font-semibold text-primary">
                                    Project Not Found
                                </h1>
                                <p className="text-muted-foreground">
                                    The project you're looking for doesn't exist or has been moved.
                                </p>
                            </div>
                            <Link
                                to="/portfolio"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
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

    return (
        <Layout>
            <main className="pb-20 md:pb-0">
                <div className="bg-gradient-to-b from-accent/30 via-accent/10 to-transparent border-b border-border">
                    <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Portfolio
                        </Link>

                        <article>
                            <header className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                                        {project.status}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.excerpt}
                                </p>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-accent text-foreground border border-border hover:border-primary/30 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </header>
                        </article>
                    </div>
                </div>


                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="prose prose-lg max-w-none">
                        <MDXContent code={project.content} />
                    </div>

                    <div className="mt-16 pt-8 border-t border-border space-y-8">
                        {latestProjects.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-serif font-semibold text-primary">
                                    Latest Projects
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {latestProjects.map((latestProject) => (
                                        <Link
                                            key={latestProject.slug}
                                            to={`/portfolio/${latestProject.slug}`}
                                            className="group block p-5 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all duration-200"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                        {latestProject.status}
                                                    </span>
                                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <h3 className="font-serif font-semibold text-lg text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                                                    {latestProject.title}
                                                </h3>
                                                {latestProject.excerpt && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {latestProject.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex flex-wrap gap-1.5">
                                                    {latestProject.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs px-2 py-0.5 rounded bg-accent text-muted-foreground"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-lg transition-all duration-200 font-medium group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            View All Projects
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default PortfolioProject;