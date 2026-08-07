import React from 'react'


const JOURNEY = [
  {
    stop: "01",
    code: "AT22",
    title: "The Workshop Studio",
    year: "2022",
    body: "Crownwell launched as a bespoke studio in London, hand-crafting small-batch minimalist accessories for local clients.",
  },
  {
    stop: "02",
    code: "ETH23",
    title: "Direct Sourcing Directives",
    year: "2023",
    body: "Transitioned to 100% recycled precious metals and conflict-free gemstones, auditing every step of our supply chain.",
  },
  {
    stop: "03",
    code: "GLO24",
    title: "Global Commerce Experience",
    year: "2024",
    body: "Engineered a headless storefront architecture with multi-currency checkout, serving clients across 30+ countries.",
  },
  {
    stop: "04",
    code: "NOW",
    title: "Sustainable Flagship Store",
    year: "2026",
    body: "Operating a fully carbon-neutral e-commerce store with over 15,000 orders delivered worldwide.",
  },
];



const AboutTimeline = () => {
  return (
    <>
   <section className="bg-foreground text-background">
        <div className="width py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Journey
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">
            From studio workshop to worldwide shipping
          </h2>

          <div className="mt-14 relative">
            <div
              className="hidden md:block absolute top-[26px] left-0 right-0 h-px bg-accent"
              aria-hidden
            />
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {JOURNEY.map((stop) => (
                <li key={stop.stop} className="relative">
                  <div className="flex items-center gap-3 md:block">
                    <span className="relative z-10 flex items-center justify-center size-[52px] rounded-full bg-foreground border-2 border-accent text-accent text-sm shrink-0">
                      {stop.code}
                    </span>
                    <span className="md:hidden text-sm text-secondary">
                      {stop.year}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="hidden md:block text-sm text-secondary/70 font-bold">
                      {stop.year}
                    </p>
                    <h3 className="mt-1 font-bold text-lg">
                      {stop.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary/60 leading-relaxed">
                      {stop.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutTimeline