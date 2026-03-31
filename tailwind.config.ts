import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#07080a",
        mist: "#9ca5b3",
        moon: "#dbe2ea",
      },
      boxShadow: {
        breath: "0 10px 60px rgba(119, 163, 255, 0.18)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(151,176,255,0.14), transparent 42%), radial-gradient(circle at 60% 80%, rgba(64,215,188,0.11), transparent 35%)",
      },
      transitionTimingFunction: {
        drift: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
