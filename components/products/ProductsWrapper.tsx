"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductGrid from '@/components/products/ProductGrid'
import ProductHero from '@/components/products/ProductHero'
import { useDebounce } from '@/hooks/useDebounce'
import { useState } from 'react'

const ProductsWrapper = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);


  return (
    <>
      <div>
        <Navbar />

        <ProductHero
          search={search}
          setSearch={setSearch}
        />

        <ProductGrid search={debouncedSearch}
          page={page}
          setPage={setPage}
        />

        <Footer />
      </div>
    </>
  )
}

export default ProductsWrapper