import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Briefcase, User, HomeIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || (path === "/blog" && location.pathname.startsWith("/blog/"));

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/blog", icon: FileText, label: "Blog" },
    { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { path: "/about", icon: User, label: "About" },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 bg-gray-100/95 backdrop-blur-sm border border-gray-300 dark:border-gray-800 dark:bg-gray-900/95 z-50 rounded-2xl shadow-lg shadow-gray-900/10 dark:shadow-black/50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "text-amber-700 dark:text-blue-300"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        <div className="flex flex-col items-center justify-center py-2 px-3">
          <ThemeToggle />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">Theme</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
