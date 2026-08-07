import Footer from '@/components/Footer'
import HomeGlobeShowcase from '@/components/home/HomeGlobeShowcase'
import HomeHero from '@/components/home/HomeHero'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HomeGlobeShowcase />
      <HomeHero />
      <Footer />
    </main>
  )
}

export default page