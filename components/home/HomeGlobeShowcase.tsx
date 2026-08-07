"use client";

import { motion } from "framer-motion";
import InteractiveGlobe from "../about/InteractiveGlobe";
import WorldMapDots from "../about/WorldMapDots";
import { Plane, Package, MapPin, Clock } from "lucide-react";

const floatCard = {
  animate: (delay: number) => ({
    y: [0, -14, 0],
    transition: {
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

function FloatingCard({
  icon: Icon,
  label,
  sub,
  className,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      custom={delay}
      variants={floatCard}
      animate="animate"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ opacity: { duration: 0.6, delay }, scale: { duration: 0.6, delay } }}
      className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-foreground bg-foreground backdrop-blur-md px-4 py-3 shadow-lg ${className}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-primary">{label}</p>
        <p className="text-xs text-accent">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function HomeGlobeShowcase() {
  return (
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden flex flex-col items-center justify-center gap-2 ">
      <WorldMapDots className="absolute inset-0 z-0 w-full h-full opacity-60" />

      {/* Floating cards around the globe */}
      <FloatingCard
        icon={Plane}
        label="Flight AB-204"
        sub="London → Dubai"
        className="left-[2%] top-[10%] hidden md:flex"
        delay={0}
      />
      <FloatingCard
        icon={Package}
        label="Package Delivered"
        sub="Singapore"
        className="right-[2%] top-[5%] hidden md:flex"
        delay={0.4}
      />
      <FloatingCard
        icon={MapPin}
        label="Live Tracking"
        sub="Sao Paulo, BR"
        className="left-[6%] bottom-[40%] hidden md:flex"
        delay={0.8}
      />
      <FloatingCard
        icon={Clock}
        label="ETA 2h 14m"
        sub="New York → Sydney"
        className="right-[6%] bottom-[28%] hidden md:flex"
        delay={1.2}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-4xl -mt-36">
          <InteractiveGlobe />
        </div>
      </div>
    </section>
  );
}