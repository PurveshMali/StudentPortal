import { Link, Links } from "react-router-dom"

const HeroSection = () => {
    return (
      <section className="bg-[#E6E0FF] py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-[#6E59A5]">Learn, Teach,</span> and Connect
                <br />
                with Students Worldwide
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                A comprehensive educational platform built by students, for students. Featuring ML-driven personalization
                for an enhanced learning experience.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">

                <Link to={"/signup"} className="bg-[#6E59A5] hover:bg-[#9371bd] text-white font-medium py-3 px-6 rounded-md">
                  Get Started
                </Link>
                <Link to={"/courses"} className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-6 rounded-md border border-gray-300">
                  Explore Courses
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#6E59A5] mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">10,000+ Students</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#6E59A5] mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">500+ Courses</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#6E59A5] mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">ML-Powered</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#6E59A5] mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">NGO Partners</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500&q=80"
                alt="Students learning together"
                className="rounded-lg shadow-lg w-[70%]"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default HeroSection
  
  