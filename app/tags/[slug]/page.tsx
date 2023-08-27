import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import Link from 'next/link';
import MyBlogComponent from '@/components/blog';

interface TagsPageProps {
  params: {
    slug: string;
  };
}

async function getPostsByTag(slug: string) {
  const posts = allPosts.filter((post) => post.tags?.includes(slug));
  return posts;
}

export async function generateMetadata({
  params,
}: TagsPageProps): Promise<Metadata> {
  const { slug } = params;

  const title = `Posts tagged with "${slug}"`;
  const description = `Explore blog posts related to the ${slug} tag.`;
  return { title, description };
}

export async function generateStaticParams(): Promise<
  TagsPageProps['params'][]
> {
  const uniqueTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || []))
  );
  return uniqueTags.map((slug) => ({ slug }));
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { slug } = params;
  const posts = await getPostsByTag(slug);

  if (!posts.length) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mt-40">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
            Tags
          </p>
          <p className="py-6"> Posts tagged with &quot;{slug}&quot;</p>
        </div>

        <MyBlogComponent posts={posts} />
      </div>
    </div>
  );
}
