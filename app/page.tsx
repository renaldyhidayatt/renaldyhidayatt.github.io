import { allPosts } from '@/.contentlayer/generated';
import MyBlogComponent from '@/components/blog';
import Skills from '@/components/skill';

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen bg-gray-100 dark:bg-[#1e2023]">
        <div className="max-w-5xl mx-auto px-8 flex flex-col justify-center h-full">
          <div className="text-center p-10 py-10">
            <h2 className="text-4xl sm:text-7xl font-bold text-[#585a5c] dark:text-slate-200">
              Renaldy Hidayat
            </h2>
            <h3 className="text-2xl py-2 text-[#585a5c] dark:text-slate-200 md:text-3xl text-[#8892b0]'">
              I'll be improve learning the backend, machine learning, and a
              little bit of the frontend.
            </h3>
          </div>
        </div>
      </div>
      <Skills />
      <div className="max-w-6xl mx-auto p-4">
        <div className="mt-20">
          <div className="pb-8">
            <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
              Blog
            </p>
            <p className="py-6">Check My Blog</p>
          </div>

          <MyBlogComponent posts={allPosts} />
        </div>
      </div>
    </div>
  );
}
