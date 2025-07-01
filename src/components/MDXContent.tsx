import * as runtime from 'react/jsx-runtime';
import React from 'react';
import CodeBlock from './CodeBlock';
import Latex from "react-latex";
import "katex/dist/katex.min.css";

const sharedComponents = {
  Latex: ({ children }: { children: string }) => (
    <div className="overflow-x-auto mb-6">
      <div className="whitespace-pre-wrap break-words text-base text-gray-800 dark:text-gray-100">
        <Latex>{children}</Latex>
      </div>
    </div>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-left border-collapse border border-gray-300 dark:border-gray-600">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-amber-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100">
      {children}
    </thead>
  ),

  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  ),

  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      {children}
    </tr>
  ),

  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-2 text-left font-semibold border border-gray-300 dark:border-gray-600">
      {children}
    </th>
  ),

  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    const child = React.Children.only(children) as React.ReactElement;
    if (child.props?.className?.startsWith('language-')) {
      return (
        <CodeBlock className={child.props.className}>
          {child.props.children}
        </CodeBlock>
      );
    }
    return <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-700">{children}</pre>;
  },

  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-serif text-amber-600 dark:text-blue-200 mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-serif text-amber-600 dark:text-blue-200 mb-4 mt-8">
      {children}
    </h2>
  ),

  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-serif text-amber-600 dark:text-blue-200 mb-4 mt-6">
      {children}
    </h3>
  ),

  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      {children}
    </p>
  ),

  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-6 list-disc">
      {children}
    </ul>
  ),

  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-6 list-decimal">
      {children}
    </ol>
  ),

  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),

  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="pl-6 py-2 mb-6 text-gray-700 dark:text-gray-300 italic bg-gray-100 dark:bg-gray-800/50 rounded-r-lg border-l-4 border-amber-500 dark:border-blue-500">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-amber-600 hover:text-amber-800 dark:text-blue-300 dark:hover:text-blue-100 underline underline-offset-2 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};

export default MDXContent;
