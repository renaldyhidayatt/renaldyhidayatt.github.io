import Link from 'next/link';
import { allPosts } from '../.contentlayer/generated';
import Image from 'next/image';

interface Post {
  _id: string;
  slug: string;
  image?: string;
  title: string;
  description?: string;
  tags?: string[];
}

interface BlogProps {
  posts: Post[];
}

const MyBlogComponent: React.FC<BlogProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post._id}
          className="bg-white dark:bg-[#1e2023] shadow-lg rounded-lg overflow-hidden"
        >
          <Link href={post.slug}>
            <div className="block hover:opacity-80 transition duration-300">
              <Image
                src={post.image!}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={post.slug}>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:underline">
                  {post.title}
                </h2>
              </div>
            </Link>
            {post.tags && (
              <div className="mt-2">
                {post.tags.map((tag) => (
                  <Link href={`/tags/${tag}`} key={tag}>
                    <span className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm py-1 px-2 rounded-full mr-2">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {post.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {post.description}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyBlogComponent;
