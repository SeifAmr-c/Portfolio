import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

/**
 * How a mark sits in its tile:
 * - `light` — dark marks (ANMAT, Fenger, Takhlees, RobEn) on a paper plate.
 * - `dark`  — already-bright marks (RepSay) on a dark plate.
 * - `bleed` — marks that carry their own background (CIB's brand blue) fill
 *             the tile edge to edge.
 */
export type LogoTone = "light" | "dark" | "bleed";

export interface LogoMarkProps {
  /** Imported logo asset from `src/assets/logos`. */
  src?: StaticImageData;
  /** Company / product name — used for the alt text and the initial fallback. */
  name: string;
  tone?: LogoTone;
  /** Extra classes for the tile. */
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
  tone = "light",
  className,
}: LogoMarkProps) {
  const bleed = tone === "bleed";

  return (
    <span
      className={cn(
        "inline-flex h-10 flex-none items-center justify-center overflow-hidden rounded-lg border",
        !src
          ? "w-10 border-line bg-surface font-mono text-sm text-muted"
          : bleed
            ? "border-line/60"
            : tone === "dark"
              ? "border-line bg-tile-dark px-2"
              : "border-line/60 bg-tile-light px-2",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`${name} logo`}
          className={bleed ? "h-full w-auto" : "h-6 w-auto object-contain"}
          sizes="120px"
        />
      ) : (
        <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}
