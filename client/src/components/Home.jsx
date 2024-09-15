import React from 'react'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import Workflow from './Workflow'



const Home = () => {
  return (
    <div className="max-w-7xl mx-auto pt-20 px-6 font-semibold">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        
      </div>
  )
}

export default Home
