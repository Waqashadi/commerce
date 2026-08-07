import { ProductPassCard } from '@/app/(pages)/about/page';
import { Gem, HeartHandshake, ShieldCheck } from 'lucide-react';
import React from 'react'

const VALUES = [
  {
    icon: Gem,
    code: "MTR",
    title: "Uncompromising Materials",
    body: "Every gemstone and metal is hand-selected and traceably sourced. We work exclusively with certified ethical suppliers to ensure zero compromise on quality or integrity.",
  },
  {
    icon: HeartHandshake,
    code: "CRT",
    title: "Master Artisan Crafts",
    body: "Eliminating mass production. Each piece spends up to 40 hours under the care of master jewellers before receiving our final seal of approval.",
  },
  {
    icon: ShieldCheck,
    code: "GUA",
    title: "Lifetime Guarantee",
    body: "Craftsmanship meant to endure generations. We offer complimentary resizing, annual polishing, and structural warranty for the lifespan of your purchase.",
  },
];


const AboutCards = () => {
  return (
    <>
   <section className="width py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Our Craft Standards
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl text-primary">
          Three principles behind every product
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v) => (
            <ProductPassCard key={v.code} {...v} />
          ))}
        </div>
      </section>
    </>
  )
}

export default AboutCards