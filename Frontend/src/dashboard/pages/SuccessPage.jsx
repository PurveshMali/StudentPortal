"use client";
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom";

const SuccessPage = ({ score, total }) => {
  //   const router = useRouter()

  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    // Navigate to the add first course page    
    // router.push("/add-first-course")
    navigate("/add-first-course");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all">
      <div className="bg-gradient-to-r from-green-500 to-green-700 py-6 px-8">
        <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
        <p className="text-green-100 mt-1">
          You've qualified to become an educator
        </p>
      </div>

      <div className="p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
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
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          You Passed the Assessment!
        </h3>
        <p className="text-gray-600 mb-6">
          You answered {score} out of {total} questions correctly.
        </p>

        <div className="w-full max-w-sm mx-auto bg-gray-100 rounded-full h-4 mb-6">
          <div
            className="bg-gradient-to-r from-green-500 to-green-700 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(score / total) * 100}%` }}
          ></div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-left">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
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
            What's Next?
          </h4>
          <ul className="space-y-2 text-green-700">
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
              Your educator profile is now being created
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
              You can now create and publish courses
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
              You'll receive an email with more details within 24 hours
            </li>
          </ul>
        </div>

        <button
          onClick={handleGoToDashboard}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium text-lg"
        >
          Go to Educator Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
