import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AboutCTA = () => {
  return (
    <>
     <section className="width text-center py-16">
        <Sparkles className="mx-auto size-6 text-accent" aria-hidden />
        <h2 className="mt-5 text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
          Ready to experience true artisan luxury?
        </h2>
        <p className="mt-5 text-foreground max-w-md mx-auto">
          Complimentary express shipping & 30-day risk-free global returns on all order values.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-accent px-7 py-3.5 text-sm font-medium transition-colors"
        >
          Shop The Collection
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>   
    </>
  )
}

export default AboutCTA