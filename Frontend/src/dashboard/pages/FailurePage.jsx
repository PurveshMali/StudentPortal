"use client"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
import React from "react"

const FailurePage = ({ score, total }) => {
//   const router = useRouter()

const navigate = useNavigate()
  const handleTryAgain = () => {
    // In a real app, this would reset the process
    console.log("Trying again")
    navigate("/new-educator")
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-6 px-8">
        <h2 className="text-2xl font-bold text-white">Not Quite There Yet</h2>
        <p className="text-orange-100 mt-1">You need more preparation to become an educator</p>
      </div>

      <div className="p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-600"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">You Didn't Pass This Time</h3>
        <p className="text-gray-600 mb-6">
          You answered {score} out of {total} questions correctly. You need at least 7 correct answers to pass.
        </p>

        <div className="w-full max-w-sm mx-auto bg-gray-100 rounded-full h-4 mb-6">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(score / total) * 100}%` }}
          ></div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 text-left">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Recommendations
          </h4>
          <ul className="space-y-2 text-orange-700">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 mt-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              Review the topics you selected in your skills
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 mt-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              Take some of our courses to improve your knowledge
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 mt-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              You can try again in 7 days
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleTryAgain}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium"
          >
            Try Again Later
          </button>

          <button
            onClick={() => router.push("/")}
            className="border border-purple-600 text-purple-700 py-3 px-8 rounded-lg hover:bg-purple-50 transition-all font-medium"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  )
}

export default FailurePage

