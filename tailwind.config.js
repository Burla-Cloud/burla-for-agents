/**
 * Burla for Agents — V3 Editorial Light.
 * Warm paper primary canvas. Deep onyx secondary inverse panel.
 * Single editorial-red accent for live state only.
 *
 * Role tokens are inverted compared to dark variants: `onyx` is now the
 * light primary canvas and `cream` is the dark inverse secondary panel.
 * Component classes (bg-onyx, text-ink, text-creamInk, ...) keep their
 * semantic meaning so the layout flips correctly without touching JSX.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#F8F4EB",
        onyxDeep: "#EEE7D5",
        surface: "#FCFAF5",
        surfaceElev: "#F4EFE0",
        surfaceHi: "#ECE5D2",
        line: "#E2DCC8",
        lineBright: "#CBC3A8",
        ink: "#0A0A0B",
        inkMuted: "#5A5A60",
        inkSubtle: "#86807A",
        inkDim: "#B3AEA1",
        cream: "#0A0A0B",
        creamDeep: "#13131A",
        creamLine: "#27272F",
        creamInk: "#F8F4EB",
        creamMuted: "#A8A8B3",
        creamSubtle: "#65656F",
        accent: "#DC2626",
        accentDeep: "#B91C1C",
        accentSoft: "rgba(220, 38, 38, 0.10)",
        accentRing: "rgba(220, 38, 38, 0.28)",
        accentInk: "#FFFFFF",
        live: "#16A34A",
        liveSoft: "rgba(22, 163, 74, 0.14)",
        warn: "#EA580C",
        error: "#DC2626",
        blue: "#1D4ED8",
        blueSoft: "rgba(29, 78, 216, 0.10)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.035em",
        eyebrow: "0.18em",
        eyebrowTight: "0.12em",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(220,38,38,0.4), 0 0 40px rgba(220,38,38,0.18)",
        card: "0 1px 0 rgba(10,10,11,0.03) inset, 0 18px 60px -20px rgba(10,10,11,0.10)",
        cream:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 60px -20px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        onyxGrad:
          "radial-gradient(60% 90% at 70% 0%, rgba(220,38,38,0.06), transparent 60%), radial-gradient(50% 70% at 0% 0%, rgba(29,78,216,0.04), transparent 60%), linear-gradient(180deg, #F8F4EB 0%, #EEE7D5 100%)",
        gridFade:
          "linear-gradient(180deg, rgba(10,10,11,0.05) 0%, transparent 60%)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        pulseDot: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.55" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floatIn: "floatIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        blink: "blink 1s steps(1) infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        sweep: "sweep 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
