import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Component: React.FC<Props> = ({
  href = "https://uicat.vercel.app/",
  title = "Explore CAT UI",
  children,
  className,
}) => {
  const isInternal = href?.startsWith("/");
  return (
    <div className="relative inline-flex items-center justify-center gap-4 group">
      <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-md blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
      {isInternal ? (
        <Link
          href={href}
          title={title}
          className={cn(
            "group relative inline-flex items-center justify-center text-base rounded-md bg-gray-900 px-8 py-2 text-lg font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30",
            className,
          )}
        >
          {children ?? "Explore CAT UI"}
          <svg
            viewBox="0 0 10 10"
            height="10"
            width="10"
            fill="none"
            className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
          >
            <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
            <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
          </svg>
        </Link>
      ) : (
        <a
          role="button"
          className={cn(
            "group relative inline-flex items-center justify-center text-base rounded-md bg-gray-900 px-8 py-2 text-lg font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30",
            className,
          )}
          title={title}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {children ?? "Explore CAT UI"}
          <svg
            viewBox="0 0 10 10"
            height="10"
            width="10"
            fill="none"
            className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
          >
            <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
            <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
          </svg>
        </a>
      )}
    </div>
  );
};
