import React from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedCourses from '../components/FeaturedCourses';
import PlatformFeatures from '../components/PlatformFeatures';
import RecommendedCourses from '../components/RecommendedCourses';
import Footer from '../dashboard/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <FeaturedCourses />
      <PlatformFeatures />
      {/* <RecommendedCourses /> */}
      <Footer />
    </div>
  )
}

export default LandingPage;
// import React from 'react';

