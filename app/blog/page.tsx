import { allPosts } from '@/.contentlayer/generated';
import MyBlogComponent from '@/components/blog';
import React from 'react';

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mt-40">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
            Blog
          </p>
          <p className="py-6">Check My Blog</p>
        </div>

        <MyBlogComponent posts={allPosts} />
      </div>
    </div>
  );
};

export default Blog;
