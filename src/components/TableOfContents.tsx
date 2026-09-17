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
                threshold: 0,
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

            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setTimeout(() => setIsScrolling(false), 800);
            window.history.pushState(null, "", window.location.hash.split("#")[0] + url);
        }
    };

    if (!toc || toc.length === 0) return null;

    return (
        <div
            style={{
                border: "2px solid hsl(var(--border))",
                boxShadow: "3px 3px 0 hsl(var(--border))",
                background: "hsl(var(--card))",
                overflow: "hidden",
            }}
        >
            {/* Header stamp */}
            <div
                style={{
                    padding: "0.6rem 1rem",
                    background: "hsl(var(--foreground))",
                    borderBottom: "2px solid hsl(var(--border))",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 900,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "hsl(var(--background))",
                    }}
                >
                    // ON THIS PAGE
                </span>
            </div>

            {/* TOC nav */}
            <nav style={{ padding: "0.75rem 0" }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {toc.map((item) => {
                        const isActive = activeId === item.url.replace("#", "");
                        return (
                            <li key={item.url}>
                                <a
                                    href={item.url}
                                    onClick={(e) => handleClick(e, item.url)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        padding: "0.6rem 1rem",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "13px",
                                        fontWeight: isActive ? 900 : 500,
                                        textDecoration: "none",
                                        color: isActive
                                            ? "hsl(var(--primary))"
                                            : "hsl(var(--foreground) / 0.75)",
                                        background: isActive
                                            ? "hsl(var(--accent) / 0.4)"
                                            : "transparent",
                                        borderLeft: isActive
                                            ? "4px solid hsl(var(--primary))"
                                            : "4px solid transparent",
                                        transition: "all 0.1s",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {item.title}
                                </a>

                                {item.items && item.items.length > 0 && (
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            margin: 0,
                                            padding: 0,
                                            borderTop: "1px solid hsl(var(--border) / 0.4)",
                                            borderBottom: "1px solid hsl(var(--border) / 0.4)",
                                        }}
                                    >
                                        {item.items.map((subItem) => {
                                            const isSubActive = activeId === subItem.url.replace("#", "");
                                            return (
                                                <li key={subItem.url}>
                                                    <a
                                                        href={subItem.url}
                                                        onClick={(e) => handleClick(e, subItem.url)}
                                                        style={{
                                                            display: "block",
                                                            padding: "0.5rem 1rem 0.5rem 2rem",
                                                            fontFamily: "var(--font-mono)",
                                                            fontSize: "12px",
                                                            fontWeight: isSubActive ? 800 : 400,
                                                            textDecoration: "none",
                                                            color: isSubActive
                                                                ? "hsl(var(--primary))"
                                                                : "hsl(var(--foreground) / 0.6)",
                                                            background: isSubActive
                                                                ? "hsl(var(--accent) / 0.3)"
                                                                : "transparent",
                                                            borderLeft: isSubActive
                                                                ? "4px solid hsl(var(--primary))"
                                                                : "4px solid transparent",
                                                            transition: "all 0.1s",
                                                        }}
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
