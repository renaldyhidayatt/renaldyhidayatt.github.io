import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Briefcase, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const BottomNav = () => {
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/blog", icon: FileText, label: "Blog" },
        { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
        { path: "/about", icon: User, label: "About" },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
            <div className="max-w-lg mx-auto bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-primary/5">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-2xl transition-all duration-300 ${active
                                        ? "text-primary"
                                        : "text-muted-foreground active:scale-95"
                                        }`}
                                >
                                    {active && (
                                        <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-in fade-in zoom-in-95 duration-200"></div>
                                    )}
                                    <div className="relative">
                                        {active && (
                                            <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full animate-pulse"></div>
                                        )}
                                        <Icon
                                            size={22}
                                            className={`relative mb-1 transition-transform duration-300 ${active ? "scale-110" : ""
                                                }`}
                                            strokeWidth={active ? 2.5 : 2}
                                        />
                                    </div>
                                    <span className={`text-xs font-semibold transition-all duration-300 ${active ? "opacity-100" : "opacity-70"
                                        }`}>
                                        {item.label}
                                    </span>
                                    {active && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in zoom-in duration-200"></div>
                                    )}
                                </Link>
                            );
                        })}
                        <div className="flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-2xl">
                            <div className="relative mb-1">
                                <ThemeToggle />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground opacity-70">
                                Theme
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;