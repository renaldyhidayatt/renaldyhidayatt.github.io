import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MinecraftIcon from "./Minecraft";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show/hide logic
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            // Background opacity logic
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    const navLinkClass = (path: string) => {
        const active = isActive(path);
        return `relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-xl overflow-hidden group ${active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
            }`;
    };

    return (
        <nav 
          className={`hidden md:block sticky top-0 z-50 transition-all duration-500 transform ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          } ${
            isScrolled ? "py-3" : "py-5"
          }`}
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className={`relative flex items-center justify-between px-6 h-16 rounded-2xl transition-all duration-500 ${
                  isScrolled ? "glass-strong shadow-2xl shadow-primary/5" : "bg-transparent"
                }`}>
                    {/* Top border glow ray */}
                    <div className={`absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <MinecraftIcon className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-200">
                            RH
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 p-1 rounded-xl">
                            {[
                                { path: "/", label: "Home" },
                                { path: "/blog", label: "Blog" },
                                { path: "/portfolio", label: "Portfolio" },
                                { path: "/about", label: "About" },
                            ].map((item) => (
                                <Link 
                                  key={item.path} 
                                  to={item.path} 
                                  className={navLinkClass(item.path)}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {isActive(item.path) && (
                                        <div className="absolute inset-0 bg-primary/10 animate-in fade-in zoom-in-95 duration-300" />
                                    )}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-1/2" />
                                </Link>
                            ))}
                        </div>

                        <div className="ml-2 pl-4 border-l border-border/50">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;