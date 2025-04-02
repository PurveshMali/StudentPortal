import React from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedCourses from '../components/FeaturedCourses';
import PlatformFeatures from '../components/PlatformFeatures';
import RecommendedCourses from '../components/RecommendedCourses';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <Header />
      <HeroSection />
      <FeaturedCourses />
      <PlatformFeatures />
      <RecommendedCourses />
    </div>
  )
}

export default LandingPage;
// import React from 'react';

