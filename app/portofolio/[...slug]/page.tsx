import { portofolio } from "@/.velite";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";

interface PortofolioPageProps {
  params: {
    slug: string[];
  };
}

async function getPortofolioFromParams(params: PortofolioPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const project = portofolio.find((project) => project.slugAsParams === slug);
  return project;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: PortofolioPageProps): Promise<Metadata> {
  const project = await getPortofolioFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `${baseUrl}/portofolio/${project.slugAsParams}`,
      images: [
        {
          url: `${baseUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}


export async function generateStaticParams(): Promise<PortofolioPageProps["params"][]> {
  const params = portofolio.map((project) => ({
    slug: [project.slugAsParams],
  }));


  return params;
}

export default async function PortofolioPage({ params }: PortofolioPageProps) {
  const project = await getPortofolioFromParams(params);

  if (!project) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{project.title}</h1>
      {project.image && (
        <img src={project.image} alt={project.title} className="w-full rounded-lg mb-4" />
      )}
      {project.date && (
        <p className="text-sm text-muted-foreground mb-2">
          Published on {new Date(project.date).toLocaleDateString()}
        </p>
      )}
      {project.description && (
        <p className="text-xl mt-0 text-muted-foreground">{project.description}</p>
      )}
      <hr className="my-4" />
      <MDXContent code={project.body} />
    </article>
  );
}

