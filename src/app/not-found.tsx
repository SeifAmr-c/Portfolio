import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found · Seif Amr Attia",
};

export default function NotFound() {
  return (
    <main className="bg-blueprint-grid flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-sm text-blueprint">
        <span aria-hidden="true">{"// "}</span>404
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-paper sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That route doesn&apos;t exist. Let&apos;s get you back to the work.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  );
}
