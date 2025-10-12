import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20 pb-20 md:pb-0">
        <h1 className="text-7xl font-bold text-amber-500 dark:text-blue-200 mb-6">
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-500 mb-10">
          Maybe you mistyped the URL or the page has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-amber-600 text-white dark:text-gray-900 dark:bg-blue-200 rounded-lg hover:bg-amber-900 dark:hover:bg-blue-300 transition-colors font-medium"
        >
          Go back to Homepage
        </Link>
      </main>
    </Layout>
  );
};

export default NotFound;
