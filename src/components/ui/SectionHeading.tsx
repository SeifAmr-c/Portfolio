import { cn } from "@/lib/utils";

/**
 * Shared eyebrow + heading. The eyebrow is a mono blueprint-blue label
 * (e.g. "// experience") — annotation, not a decorative counter.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-mono text-sm text-blueprint">
        <span aria-hidden="true">{"// "}</span>
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
