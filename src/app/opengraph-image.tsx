import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

async function clip(name: string) {
  const data = await readFile(join(process.cwd(), "public/3d", `${name}.png`));
  return `data:image/png;base64,${data.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [laptop, rocket, wave] = await Promise.all([clip("laptop"), clip("rocket"), clip("wave")]);
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/icon-192.png"))).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 80,
          color: "white",
          fontFamily: "system-ui, sans-serif",
          background:
            "radial-gradient(circle at 10% 0%, rgba(196,181,253,0.35), transparent 50%), radial-gradient(circle at 90% 10%, rgba(249,168,212,0.25), transparent 45%), #0b0b12",
        }}
      >
        <div style={{ position: "absolute", top: 56, left: 80, display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={52} height={52} alt="" />
          {profile.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680, marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 64, fontWeight: 700 }}>
            Hi, I&apos;m {profile.firstName}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wave} width={72} height={72} alt="" />
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              backgroundImage: "linear-gradient(90deg, #c4b5fd, #f9a8d4, #fdba8c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.35, color: "rgba(244,244,251,0.8)" }}>
            {profile.headline}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32, fontSize: 22 }}>
            {["Next.js", "TypeScript", "Node.js", "PostgreSQL"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 340, height: 340 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={laptop} width={300} height={300} alt="" style={{ position: "absolute", left: 20, top: 40 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={rocket} width={140} height={140} alt="" style={{ position: "absolute", right: -20, top: -20 }} />
        </div>
      </div>
    ),
    size,
  );
}
