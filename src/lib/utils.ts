/** True when a data URL is a real, followable link (not a TODO placeholder). */
export function isRealUrl(url: string | undefined | null): url is string {
  return Boolean(url && !url.startsWith("TODO_"));
}

/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
