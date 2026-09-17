import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MinecraftIcon from "./Minecraft";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    return (
        <nav
            className={`hidden md:block sticky top-0 z-50 border-b-2 border-ink bg-surface transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{ boxShadow: "0 4px 0 var(--shadow)" }}
        >
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* Brand / Logo */}
                <Link to="/" className="group flex items-center gap-3" aria-label="Home">
                    <span className="grid size-9 place-items-center border-2 border-ink bg-badge shadow-retro-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-rotate-3">
                        <MinecraftIcon className="size-7" />
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tighter text-foreground">
                            RH<span className="text-primary">.</span>
                        </span>
                        {/* Live status dot */}
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping bg-secondary opacity-60"></span>
                            <span className="relative inline-flex h-2 w-2 border border-ink bg-secondary"></span>
                        </span>
                    </span>
                </Link>

                {/* Navigation Items */}
                <div className="flex items-center gap-2">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/blog", label: "Blog" },
                        { path: "/portfolio", label: "Portfolio" },
                        { path: "/about", label: "About" },
                    ].map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`border-2 px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                                    active
                                        ? "-translate-y-0.5 border-ink bg-badge text-badge-ink shadow-retro-sm"
                                        : "border-transparent text-muted-foreground hover:border-ink hover:bg-accent-light hover:text-foreground"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
