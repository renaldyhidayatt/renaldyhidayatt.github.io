import { posts, portofolio, cheatsheet } from '#velite';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  updated_reason?: string;
  status?: string;
  excerpt?: string;
  readTime: string;
  published?: boolean;
  tags?: string[];
  image?: string;
  toc: any;
  content?: any;
}

export interface Cheatsheet {
  slug: string;
  title: string;
  description: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  version?: string;
  order?: number;
  tags?: string[];
  toc: any;
  content?: any;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  updated_reason?: string;
  status: string;
  tags?: string[];
  toc: any;
  content?: any;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPosts = (posts as any[])
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.updated_at ?? b.date).getTime() - new Date(a.updated_at ?? a.date).getTime())
      .map((post) => ({
        slug: post.slugAsParams,
        title: post.title,
        date: post.date,
        created_at: post.created_at,
        updated_at: post.updated_at,
        updated_reason: post.updated_reason,
        status: post.status,
        excerpt: post.excerpt,
        readTime: post.readTime,
        published: post.published,
        tags: post.tags || [],
        image: post.image,
        toc: post.toc,
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
    const post = (posts as any[]).find((p) => p.slugAsParams === slug);
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
      image: post.image,
      toc: post.toc,
      content: post.body,
    };
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const portfolioProjects = (portofolio as any[])
      .slice() 
      .sort((a, b) => new Date(b.updated_at ?? b.date).getTime() - new Date(a.updated_at ?? a.date).getTime()) 
      .map((project) => ({
        slug: project.slugAsParams,
        title: project.title,
        excerpt: project.excerpt,
        date: project.date,
        created_at: project.created_at,
        updated_at: project.updated_at,
        updated_reason: project.updated_reason,
        image: project.image,
        status: project.status,
        tags: project.tags || [],
        toc: project.toc,
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
    const project = (portofolio as any[]).find((p) => p.slugAsParams === slug);
    if (!project) return null;

    return {
      slug: project.slugAsParams,
      title: project.title,
      excerpt: project.excerpt,
      image: project.image,
      date: project.date,
      status: project.status,
      tags: project.tags || [],
      toc: project.toc,
      content: project.body,
    };
  } catch (error) {
    console.error(`Failed to load portfolio project: ${slug}`, error);
    return null;
  }
}

/* ── Cheatsheet ─────────────────────────────────────────────────────────── */

export async function getCheatsheets(): Promise<Cheatsheet[]> {
  try {
    return (cheatsheet as any[])
      .slice()
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title))
      .map((c) => ({
        slug: c.slugAsParams,
        title: c.title,
        description: c.description,
        date: c.date,
        created_at: c.created_at,
        updated_at: c.updated_at,
        status: c.status,
        version: c.version,
        order: c.order,
        tags: c.tags || [],
        toc: c.toc,
        content: c.body,
      }));
  } catch (error) {
    console.error('Failed to load cheatsheets:', error);
    return [];
  }
}

export async function getCheatsheet(slug: string): Promise<Cheatsheet | null> {
  try {
    const c = (cheatsheet as any[]).find((s) => s.slugAsParams === slug);
    if (!c) return null;

    return {
      slug: c.slugAsParams,
      title: c.title,
      description: c.description,
      date: c.date,
      created_at: c.created_at,
      updated_at: c.updated_at,
      status: c.status,
      version: c.version,
      order: c.order,
      tags: c.tags || [],
      toc: c.toc,
      content: c.body,
    };
  } catch (error) {
    console.error(`Failed to load cheatsheet: ${slug}`, error);
    return null;
  }
}

/**
 * Simple relevance score: number of shared tags between the source and the sheet.
 * Used for the "Related Cheatsheets" block on Blog & Portfolio pages.
 */
export function relatedCheatsheets(sourceTags: string[] = [], limit = 3): Cheatsheet[] {
  const wanted = new Set(sourceTags.map((t) => t.toLowerCase()));
  return (cheatsheet as any[])
    .map((c) => {
      const overlap = (c.tags || []).filter((t: string) => wanted.has(t.toLowerCase())).length;
      return { c, overlap };
    })
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || (a.c.order ?? 99) - (b.c.order ?? 99))
    .slice(0, limit)
    .map((x) => ({
      slug: x.c.slugAsParams,
      title: x.c.title,
      description: x.c.description,
      date: x.c.date,
      created_at: x.c.created_at,
      updated_at: x.c.updated_at,
      status: x.c.status,
      version: x.c.version,
      order: x.c.order,
      tags: x.c.tags || [],
      toc: x.c.toc,
      content: x.c.body,
    }));
}
