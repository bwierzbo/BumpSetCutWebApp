import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/content";

// Route segment config
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Embed the app icon as a base64 data URI (runs in Node at build/request time)
  const iconData = await readFile(join(process.cwd(), "app", "icon.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // Blue -> teal brand gradient (matches app icon + design system)
          background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 45%, #14B8A6 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt=""
          width={220}
          height={220}
          style={{ borderRadius: 48, boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
        />
        <div
          style={{
            marginTop: 48,
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
