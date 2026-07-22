import { cn } from "@/lib/utils";

/**
 * Stack / skill pill. Mono, hairline-bordered — reads like a spec label.
 */
export default function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface/60 px-2.5 py-1 font-mono text-xs leading-none text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
