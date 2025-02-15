import React from 'react'
import HomeCarousel from '@/components/shared/home/home-carousel'
import data from '@/lib/data'

const page = async () => {
  return (
   <HomeCarousel items={data.carousals}/>
 

  )
}

export default page
