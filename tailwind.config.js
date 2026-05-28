/**
 * Burla for Agents — design tokens.
 * Dark onyx primary canvas. Cream secondary canvas for code-heavy explainer
 * sections. One high-voltage sodium accent for live state only.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#0A0A0B",
        onyxDeep: "#040408",
        surface: "#13131A",
        surfaceElev: "#1B1B24",
        surfaceHi: "#23232E",
        line: "#27272F",
        lineBright: "#3A3A45",
        ink: "#FFFFFF",
        inkMuted: "#A8A8B3",
        inkSubtle: "#65656F",
        inkDim: "#43434C",
        cream: "#F5F1E8",
        creamDeep: "#EAE5D8",
        creamLine: "#D8D2BF",
        creamInk: "#0A0A0B",
        creamMuted: "#5A5A60",
        creamSubtle: "#86807A",
        accent: "#D9FF35",
        accentDeep: "#B8DC1E",
        accentSoft: "rgba(217, 255, 53, 0.12)",
        accentRing: "rgba(217, 255, 53, 0.30)",
        accentInk: "#0A0A0B",
        live: "#7CFC8B",
        liveSoft: "rgba(124, 252, 139, 0.14)",
        warn: "#FFB347",
        error: "#FF6B6B",
        blue: "#7BA7FF",
        blueSoft: "rgba(123, 167, 255, 0.14)",
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
        glow: "0 0 0 1px rgba(217,255,53,0.4), 0 0 40px rgba(217,255,53,0.18)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 60px -20px rgba(0,0,0,0.5)",
        cream:
          "0 1px 0 rgba(10,10,11,0.03) inset, 0 18px 50px -22px rgba(10,10,11,0.18)",
      },
      backgroundImage: {
        onyxGrad:
          "radial-gradient(60% 90% at 70% 0%, rgba(217,255,53,0.06), transparent 60%), radial-gradient(50% 70% at 0% 0%, rgba(123,167,255,0.05), transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #040408 100%)",
        gridFade:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
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
