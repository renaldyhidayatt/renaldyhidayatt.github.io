
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center text-gray-400">Loading project...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-amber-200 mb-4">Project Not Found</h1>
            <Link to="/portfolio" className="text-amber-600 hover:text-amber-800 dark:text-blue-300 dark:hover:text-blue-100 underline">
              ← Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const ContentComponent = project.content;

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/portfolio" className="text-amber-600 hover:text-amber-800 dark:text-blue-300 dark:hover:text-blue-100 text-sm mb-8 inline-block transition-colors">
          ← Back to Portfolio
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-serif font-light text-amber-700 dark:text-blue-200 mb-4">
                {project.title}
              </h1>
              <span className="text-xs px-3 py-1 rounded-full 
  bg-amber-100 text-amber-800 border border-amber-300 
  dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-500/30">
                {project.status}
              </span>

            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {project.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded 
        bg-amber-100 text-amber-800 border border-amber-300
        dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

          </header>

          <MDXContent code={project.content} />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioProject;
