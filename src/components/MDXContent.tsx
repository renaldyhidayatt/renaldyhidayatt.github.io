import * as runtime from "react/jsx-runtime";
import React from "react";
import CodeBlock from "./CodeBlock";
import Latex from "react-latex";
import "katex/dist/katex.min.css";
import { ExternalLink, Quote } from "lucide-react";

const PreContext = React.createContext(false);

export const sharedComponents = {
    Latex: ({ children }: { children: string }) => (
        <div className="overflow-x-auto my-8">
            <div className="font-serif whitespace-pre-wrap break-words text-base text-foreground bg-accent/30 p-6 rounded-xl border border-border">
                <Latex>{children}</Latex>
            </div>
        </div>
    ),

    // ── Tables ──────────────────────────────────────────────────────────────
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto my-10 rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm font-sans">{children}</table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="bg-accent/50">{children}</thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody className="bg-card divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="hover:bg-accent/30 transition-colors duration-150">{children}</tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="font-sans px-6 py-4 text-left font-semibold text-foreground text-xs uppercase tracking-wider border-b-2 border-border">
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="font-sans px-6 py-4 text-foreground">{children}</td>
    ),

    // ── Code ────────────────────────────────────────────────────────────────
    code: ({
        className,
        children,
        ...props
    }: any) => {
        const isInPre = React.useContext(PreContext);
        const isInline = !isInPre && !className && !("data-language" in props);
        if (isInline) {
            return (
                <code
                    className="px-1.5 py-0.5 mx-0.5 rounded-md bg-accent text-primary font-mono text-[0.875em] font-medium border border-border/60"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },

    pre: ({ children, ...props }: any) => {
        return (
            <PreContext.Provider value={true}>
                <CodeBlock {...props}>{children}</CodeBlock>
            </PreContext.Provider>
        );
    },

    figure: ({ children, ...props }: any) => {
        if ("data-rehype-pretty-code-figure" in props) {
            return <div className="rehype-code-block" {...props}>{children}</div>;
        }
        return <figure {...props}>{children}</figure>;
    },

    // ── Headings ─────────────────────────────────────────────────────────────
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 mt-14 first:mt-0 pb-4 border-b border-border" {...props}>
            {children}
        </h1>
    ),

    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl md:text-[28px] font-bold tracking-tight text-foreground mt-16 mb-6 pt-8 border-t border-border/60 first:border-t-0 first:pt-0 first:mt-0" {...props}>
            {children}
        </h2>
    ),

    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl md:text-[22px] font-semibold text-foreground mt-10 mb-4 flex items-center gap-3" {...props}>
            <span className="w-1 h-6 rounded-full bg-primary inline-block flex-shrink-0" />
            {children}
        </h3>
    ),

    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="text-lg font-semibold text-foreground mt-8 mb-3" {...props}>
            {children}
        </h4>
    ),

    // ── Body text ─────────────────────────────────────────────────────────────
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-[17px] text-foreground/90 leading-[1.85] mb-7 font-serif">
            {children}
        </p>
    ),

    // ── Lists ─────────────────────────────────────────────────────────────────
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="space-y-2.5 mb-8 ml-1 font-serif">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="space-y-2.5 mb-8 ml-1 list-none counter-reset-list font-serif">
            {children}
        </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="text-[16px] text-foreground/85 leading-[1.8] pl-7 relative before:content-['•'] before:absolute before:left-0 before:text-primary/60 before:font-bold before:text-lg">
            {children}
        </li>
    ),

    // ── Blockquote ────────────────────────────────────────────────────────────
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="relative my-10 p-6 pl-8 bg-accent/20 rounded-2xl border-l-[3px] border-primary/40">
            <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/10" />
            <div className="font-serif text-foreground/80 italic text-[17px] leading-[1.8] [&>p]:mb-0">
                {children}
            </div>
        </blockquote>
    ),

    // ── Links ─────────────────────────────────────────────────────────────────
    a: ({ href, children, className }: { href?: string; children: React.ReactNode, className?: string }) => {
        const isExternal = href?.startsWith("http");
        const isAnchor = href?.startsWith("#");
        const isSubheading = className?.includes("subheading-anchor");

        const handleClick = (e: React.MouseEvent) => {
            if (isAnchor) {
                e.preventDefault();
                const id = href?.substring(1);
                if (!id) return;
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80; // Account for fixed navbar
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Update URL hash without triggering navigation
                    window.history.pushState(null, "", window.location.hash.split("?")[0] + href);
                }
            }
        };

        if (isSubheading) {
            return (
                <a
                    href={href}
                    onClick={handleClick}
                    className="no-underline text-inherit hover:text-primary transition-colors duration-200"
                    aria-label="Link to section"
                >
                    {children}
                </a>
            );
        }

        return (
            <a
                href={href}
                onClick={handleClick}
                className="font-sans inline-flex items-center gap-1 text-primary hover:text-primary/70 font-medium underline decoration-primary/30 underline-offset-[3px] hover:decoration-primary/60 transition-colors duration-200"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {children}
                {isExternal && <ExternalLink className="w-3 h-3 flex-shrink-0" />}
            </a>
        );
    },

    // ── Inline formatting ─────────────────────────────────────────────────────
    strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic text-foreground/85">{children}</em>
    ),

    // ── Dividers ──────────────────────────────────────────────────────────────
    hr: () => (
        <div className="my-14 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>
    ),

    // ── Images ────────────────────────────────────────────────────────────────
    img: ({ src, alt }: { src?: string; alt?: string }) => (
        <figure className="my-10">
            <img
                src={src}
                alt={alt}
                className="rounded-2xl border border-border shadow-md w-full object-cover"
            />
            {alt && (
                <figcaption className="font-sans text-[13px] text-muted-foreground text-center mt-3">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),
};

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

interface MDXProps {
    code: string;
    components?: Record<string, React.ComponentType<any>>;
}

const MDXContent = ({ code, components }: MDXProps) => {
    const Component = useMDXComponent(code);
    return <Component components={{ ...sharedComponents, ...components }} />;
};

export default MDXContent;
