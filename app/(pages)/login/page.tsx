import Footer from '@/components/Footer'
import LoginButton from '@/components/Login'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <div>
        <Navbar/>
        <LoginButton/>
        <Footer/>
    </div>
    </>
  )
}

export default page