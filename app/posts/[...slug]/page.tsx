import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';

import { Metadata } from 'next';
import { Mdx } from '@/components/mdx-components';
import Link from 'next/link';

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      <article className="py-6 my-12 prose dark:prose-invert">
        <h1 className="mb-2">{post.title}</h1>

        <div className="mb-4">
          {post.tags?.map((tag) => (
            <Link href={`/tags/${tag}`}>
              <span
                key={tag}
                className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm py-1 px-2 rounded-full mr-2"
              >
                {tag}
              </span>
            </Link>
          ))}
        </div>

        {post.description && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        <hr className="my-4" />
        <Mdx code={post.body.code} />
      </article>
    </div>
  );
}
