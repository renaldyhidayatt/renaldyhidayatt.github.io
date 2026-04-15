import { useEffect, useState } from "react";

interface TocItem {
    title: string;
    url: string;
    items: TocItem[];
}

interface TableOfContentsProps {
    toc: TocItem[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
    const [activeId, setActiveId] = useState<string>("");
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrolling) return;
                
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { 
                rootMargin: "-20% 0% -35% 0%",
                threshold: 0
            }
        );

        const headingElements = document.querySelectorAll("h2, h3, h4");
        headingElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [toc, isScrolling]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        const id = url.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            setIsScrolling(true);
            setActiveId(id);
            
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            // Re-enable observer after behavior: "smooth" finishes (roughly)
            setTimeout(() => setIsScrolling(false), 800);
            
            window.history.pushState(null, "", window.location.hash.split("#")[0] + url);
        }
    };

    if (!toc || toc.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-primary/30" />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/80">
                    On This Page
                </h3>
            </div>
            
            <nav className="flex flex-col relative">
                <ul className="space-y-1">
                    {toc.map((item) => {
                        const isActive = activeId === item.url.replace("#", "");
                        return (
                            <li key={item.url} className="space-y-1">
                                <a
                                    href={item.url}
                                    onClick={(e) => handleClick(e, item.url)}
                                    className={`group flex items-center py-2 px-3 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "text-primary bg-primary/5 shadow-[inset_0_0_0_1px_rgba(var(--primary-rgb),0.1)]"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${
                                        isActive ? "bg-primary scale-100 opacity-100" : "bg-muted-foreground/30 scale-50 opacity-0 group-hover:opacity-100"
                                    }`} />
                                    {item.title}
                                </a>
                                {item.items && item.items.length > 0 && (
                                    <ul className="ml-6 space-y-1 border-l border-border/40 pl-4 py-1">
                                        {item.items.map((subItem) => {
                                            const isSubActive = activeId === subItem.url.replace("#", "");
                                            return (
                                                <li key={subItem.url}>
                                                    <a
                                                        href={subItem.url}
                                                        onClick={(e) => handleClick(e, subItem.url)}
                                                        className={`block py-1.5 text-[12px] transition-all duration-200 ${
                                                            isSubActive
                                                                ? "text-primary font-bold translate-x-1"
                                                                : "text-muted-foreground/70 hover:text-foreground hover:translate-x-0.5"
                                                        }`}
                                                    >
                                                        {subItem.title}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;
