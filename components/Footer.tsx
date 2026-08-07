import React from 'react'
import { Badge } from './ui/badge'

const Footer = () => {
  return (
    <>
     <div className='text-center py-6 bg-background'>
        <Badge variant={"link"}>Developed by <span className='text-primary border-t-4 font-bold'>MUHAMMAD WAQAS</span> <span className='text-accent underline'>(HaDi)</span></Badge>
    </div>   
    </>
  )
}

export default Footer