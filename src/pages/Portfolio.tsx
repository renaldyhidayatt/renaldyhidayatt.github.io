import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <div className="min-h-screen bg-white text-amber-900 dark:bg-gray-900 dark:text-blue-100">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center text-amber-400 dark:text-blue-400">Loading projects...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-amber-500 dark:bg-gray-900 dark:text-blue-100 transition-colors duration-300">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-16">
          <h1 className="text-3xl font-serif font-light text-amber-500 dark:text-blue-200 mb-4">Portfolio</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
            Selected works and projects
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="w-full mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </header>

        <section className="space-y-12">
          {paginatedProjects.map((project) => {
            

            return (
              <article
                key={project.slug}
                className="border-b border-amber-200 dark:border-blue-300/30 pb-12 last:border-b-0"
              >
                <Link to={`/portfolio/${project.slug}`} className="block group space-y-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {!loaded && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
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
                    <h2 className="text-xl font-serif text-amber-600 dark:text-blue-200 group-hover:text-amber-900 dark:group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h2>
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-blue-900/30 text-amber-600 dark:text-blue-200 border border-amber-400 dark:border-blue-500/30">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-blue-900 text-amber-700 dark:text-blue-200 border border-amber-400 dark:border-blue-600"
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
              className="px-3 py-1 rounded border text-amber-600 dark:text-blue-200 text-sm bg-white-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded border text-sm ${page === num
                  ? 'bg-amber-600 text-white dark:bg-blue-200 dark:text-gray-900'
                  : 'text-amber-600 dark:text-blue-200 bg-gray-100 dark:bg-gray-800'
                  } border-gray-300 dark:border-gray-600`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border text-amber-600 dark:text-blue-200 text-sm bg-white-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
