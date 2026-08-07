import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WishList from '@/components/wishList/WishList'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
         <WishList/>
        <Footer/>
    </div>
  )
}

export default page