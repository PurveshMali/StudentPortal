"use client"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"

const AddFirstCoursePage = () => {
//   const router = useRouter()
    const navigate = useNavigate()

  const handleAddCourse = () => {
    // router.push("/educator-dashboard?showCourseForm=true")
    navigate("/educator-dashboard?showCourseForm=true")
  }

  const handleSkip = () => {
    router.push("/educator-dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex items-center mb-8">
              <div className="text-purple-700 text-3xl font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                EduConnect
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-6 px-8">
                <h2 className="text-2xl font-bold text-white">Welcome to EduConnect!</h2>
                <p className="text-purple-100 mt-1">You're now an official educator</p>
              </div>

              <div className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
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
                    className="text-purple-600"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">Would you like to create your first course?</h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Start sharing your knowledge with students around the world. Creating your first course is a great way
                  to establish your presence as an educator.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleAddCourse}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium flex items-center justify-center"
                  >
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
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add My First Course
                  </button>

                  <button
                    onClick={handleSkip}
                    className="border border-purple-600 text-purple-700 py-3 px-8 rounded-lg hover:bg-purple-50 transition-all font-medium"
                  >
                    Skip for Now
                  </button>
                </div>

                <div className="mt-8 bg-purple-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-purple-800 mb-2">Why create a course?</h4>
                  <ul className="space-y-2 text-purple-700">
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
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Share your expertise with students worldwide
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
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Earn recognition in your field
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
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Build your teaching portfolio
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddFirstCoursePage

