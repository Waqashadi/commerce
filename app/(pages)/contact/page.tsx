import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactForm from '@/components/contact/ContactForm'
import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactMap from '@/components/contact/ContactMap'
import NewsletterCTA from '@/components/contact/NewsletterCTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <div>
        <Navbar/>
        <ContactHero/>
         <div className="width grid gap-10 lg:grid-cols-2 pt-16">
        <ContactForm />

        <ContactInfo />
      </div>

     <ContactFAQ />

      <ContactMap />

      <NewsletterCTA />

        <Footer/>
    </div>
    </>
  )
}

export default page