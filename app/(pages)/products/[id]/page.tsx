import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductDetails from '@/components/products/singleProduct/ProductDetails';
import React from 'react'


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {

     const { id } = await params;

  return (
    <div>
        <Navbar/>
        <ProductDetails id={Number(id)} />
        <Footer/>
    </div>
  )
}

export default page