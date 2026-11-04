import Script from "next/script";
import { site } from "@/data/site";

/**
 * Visitor analytics — Microsoft Clarity (free, no npm dependency).
 * Dashboard: https://clarity.microsoft.com → per-visit session length,
 * scroll depth, device/country, heatmaps and session recordings.
 *
 * The project ID lives in site.ts (NEXT_PUBLIC_CLARITY_ID overrides it).
 * Only loads in production builds, so `npm run dev` doesn't pollute the stats.
 */
const CLARITY_ID = (
  process.env.NEXT_PUBLIC_CLARITY_ID ?? site.analytics.clarityId
).trim();

export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  // Project IDs are short alphanumerics; refuse anything else before it
  // ends up inside an inline script.
  if (!/^[a-z0-9]+$/i.test(CLARITY_ID)) return null;

  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
    </Script>
  );
}
