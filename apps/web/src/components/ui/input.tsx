import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none ring-brand-500 transition focus:ring-2 dark:border-slate-800 dark:bg-slate-950",
        className
      )}
      {...props}
    />
  );
}
