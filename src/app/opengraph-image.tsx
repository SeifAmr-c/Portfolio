import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Seif Amr Attia — Data Analyst & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette (literal — CSS vars aren't available in the OG render context).
const INK = "#0F1115";
const LINE = "#2A2E37";
const PAPER = "#ECEAE3";
const MUTED = "#8A8F98";
const ACCENT = "#F5A524";
const BLUEPRINT = "#5B7DB1";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: BLUEPRINT,
            fontSize: 26,
            fontFamily: "monospace",
          }}
        >
          <span>{"// "}</span>
          <span>{profile.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: PAPER,
              letterSpacing: "-3px",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              color: MUTED,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {profile.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontFamily: "monospace",
            color: PAPER,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              background: ACCENT,
            }}
          />
          <span>RepSay · live on the iOS App Store</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
