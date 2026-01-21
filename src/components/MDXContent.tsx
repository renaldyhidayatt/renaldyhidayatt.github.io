import * as runtime from "react/jsx-runtime";
import React from "react";
import CodeBlock from "./CodeBlock";
import Latex from "react-latex";
import "katex/dist/katex.min.css";
import { ExternalLink, Info } from "lucide-react";

export const sharedComponents = {
    Latex: ({ children }: { children: string }) => (
        <div className="overflow-x-auto mb-8">
            <div className="font-serif whitespace-pre-wrap break-words text-base text-foreground bg-accent/30 p-6 rounded-xl border border-border">
                <Latex>{children}</Latex>
            </div>
        </div>
    ),
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto mb-8 rounded-xl border border-border shadow-sm">
            <table className="w-full text-sm font-sans">{children}</table>
        </div>
    ),

    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="bg-accent/50 backdrop-blur-sm">{children}</thead>
    ),

    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody className="bg-card divide-y divide-border">{children}</tbody>
    ),

    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="hover:bg-accent/30 transition-colors duration-150">
            {children}
        </tr>
    ),

    th: ({ children }: { children: React.ReactNode }) => (
        <th className="font-sans px-6 py-4 text-left font-semibold text-primary border-b-2 border-border">
            {children}
        </th>
    ),

    td: ({ children }: { children: React.ReactNode }) => (
        <td className="font-sans px-6 py-4 text-foreground">{children}</td>
    ),
    code: ({
        className,
        children,
    }: {
        className?: string;
        children: React.ReactNode;
    }) => <CodeBlock className={className}>{children}</CodeBlock>,

    pre: ({ children }: { children: React.ReactNode }) => {
        const child = React.Children.only(children) as React.ReactElement;

        if (child.props?.className?.startsWith("language-")) {
            return (
                <CodeBlock className={child.props.className}>
                    {child.props.children}
                </CodeBlock>
            );
        }

        return (
            <pre className="font-mono bg-card p-6 rounded-xl overflow-x-auto border border-border shadow-sm mb-8 text-sm leading-relaxed">
                {children}
            </pre>
        );
    },
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-6 mt-12 first:mt-0 pb-3 border-b-2 border-border">
            {children}
        </h1>
    ),

    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-5 mt-10 border-l-4 border-primary pl-4">
            {children}
        </h2>
    ),

    h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-4 mt-8">
            {children}
        </h3>
    ),

    h4: ({ children }: { children: React.ReactNode }) => (
        <h4 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-3 mt-6">
            {children}
        </h4>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="font-serif text-base text-foreground leading-relaxed mb-6">
            {children}
        </p>
    ),

    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="font-serif space-y-3 mb-8 ml-6">{children}</ul>
    ),

    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="font-serif space-y-3 mb-8 ml-6 list-decimal">
            {children}
        </ol>
    ),

    li: ({ children }: { children: React.ReactNode }) => (
        <li className="font-serif text-foreground leading-relaxed pl-2 relative before:content-['▸'] before:absolute before:-left-6 before:text-primary before:font-bold">
            {children}
        </li>
    ),

    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="relative pl-6 py-4 mb-8 bg-accent/30 rounded-r-xl border-l-4 border-primary shadow-sm">
            <div className="absolute top-4 left-3 opacity-20">
                <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="font-serif text-foreground italic leading-relaxed">
                {children}
            </div>
        </blockquote>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
        const isExternal = href?.startsWith("http");
        return (
            <a
                href={href}
                className="font-sans inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary/60 transition-all duration-200"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {children}
                {isExternal && <ExternalLink className="w-3.5 h-3.5" />}
            </a>
        );
    },

    strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold text-primary">{children}</strong>
    ),

    em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic text-foreground/90">{children}</em>
    ),

    hr: () => <hr className="my-12 border-t-2 border-border" />,

    img: ({ src, alt }: { src?: string; alt?: string }) => (
        <figure className="my-8">
            <img
                src={src}
                alt={alt}
                className="rounded-xl border border-border shadow-lg w-full object-cover"
            />
            {alt && (
                <figcaption className="font-sans text-sm text-muted-foreground text-center mt-3 italic">
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
