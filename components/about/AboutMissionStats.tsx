import React from 'react'

const STATS = [
  { value: "100%", label: "Ethical Gold & Gems" },
  { value: "48h", label: "Global Express Shipping" },
  { value: "15k+", label: "Verified 5-Star Reviews" },
  { value: "0%", label: "Carbon Footprint Target" },
];


const AboutMissionStats = () => {
  return (
    <>
     <section className="bg-foreground text-background">
             <div className="width py-16">
               <p className=" italic text-2xl md:text-3xl leading-relaxed max-w-3xl">
                 &ldquo;We believe luxury shouldn&apos;t cost the planet or rely on artificial markups. We build pieces with lasting emotional and physical value.&rdquo;
               </p>
               <p className="mt-5 text-sm uppercase tracking-[0.2em] text-accent">
                 — Founder & Atelier Lead
               </p>
     
               <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                 {STATS.map((stat) => (
                   <div key={stat.label} className="flex flex-col items-center text-center">
                     <div className="relative flex items-center justify-center size-24 md:size-28 rounded-full border-2 border-dashed border-accent">
                       <span className=" text-xl md:text-2xl font-semibold text-accent">
                         {stat.value}
                       </span>
                     </div>
                     <p className="mt-4 text-xs md:text-sm text-background/60 uppercase tracking-wide">
                       {stat.label}
                     </p>
                   </div>
                 ))}
               </div>
             </div>
           </section>   
    </>
  )
}

export default AboutMissionStats