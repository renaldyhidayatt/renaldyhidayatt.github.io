import { posts, portofolio } from '#velite';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  status?: string;
  excerpt?: string;
  readTime: string;
  published?: boolean;
  tags?: string[];
  content?: any;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  status: string;
  tags?: string[];
  content?: any;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPosts = posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((post) => ({
        slug: post.slugAsParams,
        title: post.title,
        date: post.date,
        status: post.status,
        excerpt: post.excerpt,
        readTime: post.readTime,
        published: post.published,
        tags: post.tags || [],
        content: post.body,
      }));

    return blogPosts;
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = posts.find((p) => p.slugAsParams === slug);
    if (!post) return null;

    return {
      slug: post.slugAsParams,
      title: post.title,
      date: post.date,
      status: post.status,
      excerpt: post.excerpt,
      readTime: post.readTime,
      published: post.published,
      tags: post.tags || [],
      content: post.body,
    };
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const portfolioProjects = portofolio.map((project) => ({
      slug: project.slugAsParams,
      title: project.title,
      excerpt: project.excerpt,
      date: project.date,
      image: project.image,
      status: project.status,
      tags: project.tags || [],
      content: project.body,
    }));

    return portfolioProjects;
  } catch (error) {
    console.error('Failed to load portfolio projects:', error);
    return [];
  }
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const project = portofolio.find((p) => p.slugAsParams === slug);
    if (!project) return null;

    return {
      slug: project.slugAsParams,
      title: project.title,
      excerpt: project.excerpt,
      image: project.image,
      date: project.date,
      status: project.status,
      tags: project.tags || [],
      content: project.body,
    };
  } catch (error) {
    console.error(`Failed to load portfolio project: ${slug}`, error);
    return null;
  }
}
