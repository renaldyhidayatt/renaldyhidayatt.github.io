import * as runtime from "react/jsx-runtime";
import React from "react";
import CodeBlock from "./CodeBlock";
import Latex from "react-latex";
import "katex/dist/katex.min.css";
import { ExternalLink } from "lucide-react";

const PreContext = React.createContext(false);

export const sharedComponents = {
    Latex: ({ children }: { children: string }) => (
        <div style={{ overflowX: "auto", margin: "2rem 0" }}>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    border: "2px solid hsl(var(--border))",
                    boxShadow: "4px 4px 0 hsl(var(--border))",
                    background: "hsl(var(--muted))",
                    padding: "1.25rem 1.5rem",
                    fontSize: "0.95rem",
                    color: "hsl(var(--foreground))",
                    position: "relative",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: "-11px",
                        left: "12px",
                        fontSize: "9px",
                        fontWeight: 900,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        background: "hsl(var(--accent))",
                        border: "2px solid hsl(var(--border))",
                        padding: "0 6px",
                        color: "hsl(var(--foreground))",
                        fontFamily: "var(--font-mono)",
                    }}
                >
                    MATH
                </span>
                <Latex>{children}</Latex>
            </div>
        </div>
    ),

    // ── Tables ──────────────────────────────────────────────────────────────
    table: ({ children }: { children: React.ReactNode }) => (
        <div
            style={{
                overflowX: "auto",
                margin: "2.5rem 0",
                border: "2px solid hsl(var(--border))",
                boxShadow: "4px 4px 0 hsl(var(--border))",
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                }}
            >
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead
            style={{
                background: "hsl(var(--foreground))",
                color: "hsl(var(--background))",
            }}
        >
            {children}
        </thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            {children}
        </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th
            style={{
                padding: "0.75rem 1rem",
                textAlign: "left",
                fontWeight: 900,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
            }}
        >
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td
            style={{
                padding: "0.75rem 1rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "hsl(var(--foreground))",
                borderRight: "1px solid hsl(var(--border) / 0.4)",
            }}
        >
            {children}
        </td>
    ),

    // ── Code ────────────────────────────────────────────────────────────────
    code: ({ className, children, ...props }: any) => {
        const isInPre = React.useContext(PreContext);
        const isInline = !isInPre && !className && !("data-language" in props);
        if (isInline) {
            return (
                <code
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85em",
                        fontWeight: 700,
                        background: "hsl(var(--foreground))",
                        color: "hsl(var(--background))",
                        padding: "0.1em 0.45em",
                        border: "1.5px solid hsl(var(--border))",
                        letterSpacing: "0.02em",
                    }}
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

    pre: ({ children, ...props }: any) => (
        <PreContext.Provider value={true}>
            <CodeBlock {...props}>{children}</CodeBlock>
        </PreContext.Provider>
    ),

    figure: ({ children, ...props }: any) => {
        if ("data-rehype-pretty-code-figure" in props) {
            return <div className="rehype-code-block" {...props}>{children}</div>;
        }
        return <figure {...props}>{children}</figure>;
    },

    // ── Headings ─────────────────────────────────────────────────────────────
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "hsl(var(--foreground))",
                margin: "3.5rem 0 1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "3px solid hsl(var(--border))",
                lineHeight: 1.1,
            }}
            {...props}
        >
            {children}
        </h1>
    ),

    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "hsl(var(--foreground))",
                margin: "3rem 0 1rem",
                paddingTop: "0.75rem",
                paddingLeft: "1rem",
                borderTop: "2px solid hsl(var(--border))",
                lineHeight: 1.15,
                position: "relative",
            }}
            {...props}
        >
            <span
                style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "4px",
                    height: "60%",
                    background: "hsl(var(--primary))",
                    display: "block",
                    marginTop: "0.35rem",
                }}
            />
            {children}
        </h2>
    ),

    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "hsl(var(--foreground))",
                margin: "2.25rem 0 0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                lineHeight: 1.2,
            }}
            {...props}
        >
            <span
                style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    background: "hsl(var(--accent))",
                    border: "2px solid hsl(var(--border))",
                    flexShrink: 0,
                }}
            />
            {children}
        </h3>
    ),

    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.95rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "hsl(var(--muted-foreground))",
                margin: "1.75rem 0 0.5rem",
                borderLeft: "3px solid hsl(var(--accent))",
                paddingLeft: "0.6rem",
            }}
            {...props}
        >
            {children}
        </h4>
    ),

    // ── Body text ─────────────────────────────────────────────────────────────
    p: ({ children }: { children: React.ReactNode }) => (
        <p
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.975rem",
                lineHeight: 1.9,
                color: "hsl(var(--foreground) / 0.88)",
                marginBottom: "1.5rem",
                letterSpacing: "0.01em",
            }}
        >
            {children}
        </p>
    ),

    // ── Lists ─────────────────────────────────────────────────────────────────
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul
            style={{
                listStyle: "none",
                margin: "0 0 1.75rem 0",
                padding: 0,
                fontFamily: "var(--font-mono)",
            }}
        >
            {children}
        </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol
            style={{
                listStyle: "none",
                margin: "0 0 1.75rem 0",
                padding: 0,
                fontFamily: "var(--font-mono)",
                counterReset: "brute-ol",
            }}
        >
            {children}
        </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "hsl(var(--foreground) / 0.85)",
                paddingLeft: "1.6rem",
                marginBottom: "0.45rem",
                position: "relative",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    left: 0,
                    top: "0.55em",
                    width: "8px",
                    height: "8px",
                    background: "hsl(var(--primary))",
                    border: "1.5px solid hsl(var(--border))",
                    display: "inline-block",
                    flexShrink: 0,
                }}
            />
            {children}
        </li>
    ),

    // ── Blockquote ────────────────────────────────────────────────────────────
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote
            style={{
                position: "relative",
                margin: "2.25rem 0",
                padding: "1.5rem 1.5rem 1.25rem 1.5rem",
                background: "hsl(var(--accent) / 0.18)",
                border: "2px solid hsl(var(--border))",
                borderLeft: "6px solid hsl(var(--primary))",
                boxShadow: "4px 4px 0 hsl(var(--border))",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "-12px",
                    left: "14px",
                    fontSize: "9px",
                    fontWeight: 900,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    border: "2px solid hsl(var(--border))",
                    padding: "0 8px",
                    fontFamily: "var(--font-mono)",
                }}
            >
                QUOTE
            </span>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.975rem",
                    lineHeight: 1.8,
                    color: "hsl(var(--foreground) / 0.82)",
                    fontStyle: "italic",
                    letterSpacing: "0.015em",
                }}
            >
                {children}
            </div>
        </blockquote>
    ),

    // ── Links ─────────────────────────────────────────────────────────────────
    a: ({ href, children, className }: { href?: string; children: React.ReactNode; className?: string }) => {
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
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    window.history.pushState(null, "", window.location.hash.split("?")[0] + href);
                }
            }
        };

        if (isSubheading) {
            return (
                <a
                    href={href}
                    onClick={handleClick}
                    style={{ textDecoration: "none", color: "inherit" }}
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
                style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: "hsl(var(--primary))",
                    textDecoration: "underline",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "3px",
                    textDecorationColor: "hsl(var(--primary) / 0.5)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                }}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {children}
                {isExternal && <ExternalLink style={{ width: "0.7em", height: "0.7em", flexShrink: 0 }} />}
            </a>
        );
    },

    // ── Inline formatting ─────────────────────────────────────────────────────
    strong: ({ children }: { children: React.ReactNode }) => (
        <strong
            style={{
                fontWeight: 900,
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-mono)",
                background: "hsl(var(--accent) / 0.35)",
                padding: "0 3px",
            }}
        >
            {children}
        </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
        <em
            style={{
                fontStyle: "italic",
                color: "hsl(var(--foreground) / 0.8)",
                fontFamily: "var(--font-mono)",
            }}
        >
            {children}
        </em>
    ),

    // ── Dividers ──────────────────────────────────────────────────────────────
    hr: () => (
        <div style={{ margin: "3rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ flex: 1, height: "2px", background: "hsl(var(--border))" }} />
            <span
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    color: "hsl(var(--muted-foreground))",
                    padding: "2px 8px",
                    border: "2px solid hsl(var(--border))",
                    background: "hsl(var(--muted))",
                }}
            >
                ///
            </span>
            <div style={{ flex: 1, height: "2px", background: "hsl(var(--border))" }} />
        </div>
    ),

    // ── Images ────────────────────────────────────────────────────────────────
    img: ({ src, alt }: { src?: string; alt?: string }) => (
        <figure style={{ margin: "2.5rem 0" }}>
            <div
                style={{
                    border: "2px solid hsl(var(--border))",
                    boxShadow: "5px 5px 0 hsl(var(--border))",
                    overflow: "hidden",
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                />
            </div>
            {alt && (
                <figcaption
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "hsl(var(--muted-foreground))",
                        textAlign: "center",
                        marginTop: "0.6rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                    }}
                >
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
