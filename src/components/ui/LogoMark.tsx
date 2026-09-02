import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export interface LogoMarkProps {
  /** Imported logo asset from `src/assets/logos`. */
  src?: StaticImageData;
  /** Company / product name — used for the alt text and the initial fallback. */
  name: string;
  /**
   * Dark marks (Fenger, Takhlees, ANMAT) need a light plate to read on ink;
   * marks that are already bright (RepSay) sit on the surface unplated.
   */
  plate?: boolean;
  /** Tailwind height class for the tile — defaults to the timeline size. */
  className?: string;
}

/**
 * A brand tile: the real logo when we have one, otherwise the company initial
 * in mono so every row on the timeline keeps the same left edge and rhythm.
 * The tile hugs the logo's aspect ratio, so wordmarks stay wide and icons square.
 */
export default function LogoMark({
  src,
  name,
  plate = true,
  className,
}: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex h-10 flex-none items-center justify-center overflow-hidden rounded-lg border",
        src
          ? plate
            ? "border-line/60 bg-paper px-2"
            : "border-line bg-surface px-2"
          : "w-10 border-line bg-surface font-mono text-sm text-muted",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`${name} logo`}
          className="h-6 w-auto object-contain"
          sizes="120px"
        />
      ) : (
        <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}
