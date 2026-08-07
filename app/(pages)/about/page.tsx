import { Gem } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import AboutMissionStats from "@/components/about/AboutMissionStats";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutCTA from "@/components/about/AboutCTA";
import AboutCards from "@/components/about/AboutCards";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function AboutPage() {
  return (
    <main className="">
      <Navbar/>
      <div className="">
      <AboutHero/>
      </div>
      <AboutMissionStats/>
      <AboutCards/>
      <AboutTimeline/>
      <AboutCTA/>
      <Footer/>
    </main>
  );
}

export function ProductPassCard({
  icon: Icon,
  code,
  title,
  body,
}: {
  icon: typeof Gem;
  code: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-2xl bg-background shadow-[0_1px_2px_rgba(11,31,59,0.06)] border border-foreground">
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="flex items-center justify-center size-10 rounded-full bg-background text-foreground">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="text-xs font-semibold tracking-[0.2em] text-foreground">
          {code}
        </span>
      </div>

      <div className="px-6 pt-5 pb-7">
        <h3 className="text-xl">{title}</h3>
        <p className="mt-3 text-sm text-foreground leading-relaxed">{body}</p>
      </div>

      {/* Perforated ticket edge */}
      <div className="relative h-0">
        <div className="absolute -left-3 -top-3 size-6 rounded-full bg-background" />
        <div className="absolute -right-3 -top-3 size-6 rounded-full bg-background" />
        <div
          className="absolute left-3 right-3 top-0 border-t border-dashed border-background"
        />
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-background/60">
          AUTHENTICATED PRODUCT
        </span>
        <span className="text-[10px] tracking-[0.2em] text-background/60">
          VERIFIED PASS #{code}
        </span>
      </div>
    </div>
  );
}