import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import MDXContent from "@/components/MDXContent";
import { getPortfolioProject } from "@/utils/mdx";

const PortfolioProject = () => {
    const { slug } = useParams();

    const { data: project, isLoading, error } = useQuery({
        queryKey: ['portfolio-project', slug],
        queryFn: () => getPortfolioProject(slug!),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center text-muted-foreground">Loading project...</div>
                </main>
            </Layout>
        );
    }

    if (error || !project) {
        return (
            <Layout>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif text-primary mb-4">Project Not Found</h1>
                        <Link to="/portfolio" className="text-primary hover:text-primary/80 underline transition-colors">
                            ← Back to Portfolio
                        </Link>
                    </div>
                </main>
            </Layout>
        );
    }

    const ContentComponent = project.content;

    return (
        <Layout>
            <main className="max-w-2xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <Link to="/portfolio" className="text-primary hover:text-primary/80 text-sm mb-8 inline-block transition-colors">
                    ← Back to Portfolio
                </Link>
                <article>
                    <header className="mb-12">
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-3xl font-serif font-light text-primary mb-4">
                                {project.title}
                            </h1>
                            <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground border border-border">
                                {project.status}
                            </span>

                        </div>

                        <p className="text-foreground mb-6 leading-relaxed">
                            {project.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground border border-border"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                    </header>

                    <MDXContent code={project.content} />
                </article>
            </main>
        </Layout>
    );
};

export default PortfolioProject;
