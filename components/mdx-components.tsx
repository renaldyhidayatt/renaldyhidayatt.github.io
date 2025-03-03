import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  Latex: (props: { children: string }) => <Latex>{props.children}</Latex>,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
