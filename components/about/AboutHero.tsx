"use client";

import AINeuralCore from "./Aineuralcore";


const FEATURES = [
  {
    label: "Real-time inference",
    detail: "Responses stream back in milliseconds, not seconds.",
    side: "left" as const,
    position: "top-[8%] lg:top-[10%]",
  },
  {
    label: "Adaptive learning",
    detail: "The model refines itself with every interaction.",
    side: "left" as const,
    position: "bottom-[14%] lg:bottom-[16%]",
  },
  {
    label: "Context-aware reasoning",
    detail: "Every node in the network informs the next decision.",
    side: "right" as const,
    position: "top-[14%] lg:top-[16%]",
  },
  {
    label: "Secure by design",
    detail: "Signals stay encrypted end-to-end, always.",
    side: "right" as const,
    position: "bottom-[8%] lg:bottom-[10%]",
  },
];

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground py-20 lg:py-28">
      {/* faint grid texture, subtle, not the whole show */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#818cf8 1px, transparent 1px), linear-gradient(90deg, #818cf8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Eyebrow + heading */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-4">
            How it thinks
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight leading-[1.05]">
            One core.{" "}
            <span className="bg-primary bg-clip-text text-transparent">
              Every signal connected.
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-secondary/60 leading-relaxed">
            Every request moves through the same living network — routed,
            weighed, and answered in real time.
          </p>
        </div>

        {/* Scene with anchored feature callouts */}
        <div className="relative mt-8 lg:mt-4">
          <AINeuralCore />

          {FEATURES.map((f) => (
            <div
              key={f.label}
              className={`hidden lg:block absolute ${f.position} ${
                f.side === "left" ? "left-[2%] text-right" : "right-[2%] text-left"
              } max-w-[220px]`}
            >
              <div
                className={`flex flex-col gap-1 ${
                  f.side === "left" ? "items-end" : "items-start"
                }`}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase text-accent">
                  {f.side === "right" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                  )}
                  {f.label}
                  {f.side === "left" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                  )}
                </span>
                <p className="text-sm text-secondary/60 leading-snug">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: features as a simple grid below the scene */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 lg:hidden">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {f.label}
              </span>
              <p className="text-sm text-secondary/60 leading-snug">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}