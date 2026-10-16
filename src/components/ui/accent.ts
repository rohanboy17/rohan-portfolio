import type { Accent } from "@/content/profile";

// Full class strings so Tailwind can see them at build time.
export const accentStyles: Record<
  Accent,
  { text: string; bg: string; soft: string; border: string; hex: string; from: string }
> = {
  lilac: { text: "text-lilac", bg: "bg-lilac", soft: "bg-lilac/10", border: "border-lilac/25", hex: "#c4b5fd", from: "from-lilac/25" },
  peach: { text: "text-peach", bg: "bg-peach", soft: "bg-peach/10", border: "border-peach/25", hex: "#fdba8c", from: "from-peach/25" },
  mint: { text: "text-mint", bg: "bg-mint", soft: "bg-mint/10", border: "border-mint/25", hex: "#86efac", from: "from-mint/25" },
  sky: { text: "text-sky", bg: "bg-sky", soft: "bg-sky/10", border: "border-sky/25", hex: "#7dd3fc", from: "from-sky/25" },
  pink: { text: "text-pink", bg: "bg-pink", soft: "bg-pink/10", border: "border-pink/25", hex: "#f9a8d4", from: "from-pink/25" },
  butter: { text: "text-butter", bg: "bg-butter", soft: "bg-butter/10", border: "border-butter/25", hex: "#fde68a", from: "from-butter/25" },
};
