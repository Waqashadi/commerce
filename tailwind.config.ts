// Merge this into your existing tailwind.config.ts

import type { Config } from "tailwindcss";

const additions: Partial<Config> = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        grow: {
          from: { transform: "scaleY(0)", opacity: "0" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        grow: "grow 900ms cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
};

export default additions;