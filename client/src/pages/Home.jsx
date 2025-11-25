import React from 'react'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import Testimonial from '../components/Testimonial'
import Features from '../components/Features'

const Home = () => {
  return (
    <>
    <Hero />
     <Features />
     <NewArrivals />
     <PopularProducts />
     <div className="hidden sm:block max-padd-container mt-28 bg-[url('/src/assets/banner.png')] bg-cover bg-center bg-no-repeat h-[288px]"/>
     <Testimonial />
    </>
  )
}

export default Home