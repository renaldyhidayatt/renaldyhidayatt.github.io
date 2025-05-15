"use client";

import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface TagProps {
  tag: string;
  name: string;
  current?: boolean;
  count?: number;
}
export function Tag({ tag, current, count, name }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md text-[#585a5c] dark:text-slate-200 whitespace-nowrap",
      })}
      href={`/tags/${name}/${slug(tag)}`}
      onClick={(e) => e.stopPropagation()}
    >
      {"#" + tag} {count ? `(${count})` : null}
    </Link>
  );
}
