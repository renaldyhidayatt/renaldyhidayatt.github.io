import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div
      className={`
  col-span-12 lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
  prose-blockquote:bg-accent/20 prose-blockquote:p-2 prose-blockquote:px-6
  prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:rounded-r-lg
  prose-li:marker:text-accent
  dark:prose-invert dark:prose-blockquote:border-accentDark
  dark:prose-blockquote:bg-accentDark/20 dark:prose-li:marker:text-accentDark
  first-letter:text-3xl sm:first-letter:text-5xl
`}
    >
      <Component components={components} />
    </div>
  );
}
