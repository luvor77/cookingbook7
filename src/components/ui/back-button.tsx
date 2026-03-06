"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const onClick = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed left-4 top-4 z-30 rounded-md bg-white/10 text-white backdrop-blur px-4 py-2 hover:bg-white/15 transition",
        className,
      )}
      aria-label="Назад"
    >
      Назад
    </button>
  );
}
