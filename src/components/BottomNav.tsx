import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Briefcase, User } from "lucide-react";
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
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border z-50 rounded-2xl shadow-lg">
            <div className="flex items-center justify-around px-4 py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${isActive(item.path)
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <div className="flex flex-col items-center justify-center py-2 px-3">
                    <ThemeToggle />
                    <span className="text-xs font-medium text-muted-foreground mt-1">Theme</span>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
