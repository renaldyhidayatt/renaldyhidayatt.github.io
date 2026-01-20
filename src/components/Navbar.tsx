import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MinecraftIcon from "./Minecraft";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    const navLinkClass = (path: string) => {
        const active = isActive(path);
        return `relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${active
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`;
    };

    return (
        <nav className="hidden md:block border-b border-border/40 bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <MinecraftIcon />
                        </div>
                        <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                            RH
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-accent/50 border border-border/50 rounded-full p-1.5 shadow-sm">
                            <Link to="/" className={navLinkClass("/")}>
                                Home
                            </Link>
                            <Link to="/blog" className={navLinkClass("/blog")}>
                                Blog
                            </Link>
                            <Link to="/portfolio" className={navLinkClass("/portfolio")}>
                                Portfolio
                            </Link>
                            <Link to="/about" className={navLinkClass("/about")}>
                                About
                            </Link>
                        </div>

                        <div className="ml-4 pl-4 border-l border-border">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;