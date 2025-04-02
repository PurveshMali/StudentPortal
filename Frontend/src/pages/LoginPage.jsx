"use client";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import { FaSpinner } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are stored and sent with requests
        }
      );

      console.log("Login successful:", response.data);
      alert("Login successful!"); // Handle UI state
      navigate("/dashboard"); // Redirect to dashboard or another page
      // Optionally, you can store the token in localStorage or context for further API calls
      localStorage.setItem("token", response.data.token);
      // Redirect user or update UI accordingly
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrors("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link
            to={"/"}
            className="flex items-center text-[#6E59A5] font-bold text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open-icon lucide-book-open"
            >
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
            <span className="ml-2">EduConnect</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Or{" "}
          <Link
            to={"/signup"}
            className="font-medium text-[#6E59A5] hover:text-[#4f3986]"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#af9bff] focus:border-[#af9bff] sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#af9bff] focus:border-[#af9bff] sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#af9bff] focus:ring-[#af9bff] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to={"/"}
                  className="font-medium text-[#8b71f0] hover:[#af9bff]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6E59A5] hover:bg-[#77689e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Link
                  to={"/"}
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22.0367422,12 C22.0367422,11.3607602 21.9811382,10.7404063 21.8781318,10.1409091 L12,10.1409091 L12,14.0363636 L17.6322897,14.0363636 C17.4231524,15.1881818 16.7244793,16.1683168 15.6954173,16.8090909 L15.6954173,19.0454545 L19.1881318,19.0454545 C21.0060793,17.4072727 22.0367422,14.9563636 22.0367422,12 L22.0367422,12 Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12,22 C14.9528207,22 17.4354793,21.0545455 19.1881318,19.0454545 L15.6954173,16.8090909 C14.8089639,17.3909091 13.6253837,17.7272727 12,17.7272727 C9.13131318,17.7272727 6.70901033,15.8127273 5.84677686,13.2 L2.23131318,13.2 L2.23131318,15.5090909 C3.97371033,19.2954545 7.69061033,22 12,22 L12,22 Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5.84677686,13.2 C5.62790355,12.6 5.50677686,11.9581818 5.50677686,11.3 C5.50677686,10.6418182 5.62790355,10 5.84677686,9.4 L5.84677686,7.09090909 L2.23131318,7.09090909 C1.59213223,8.36363636 1.22313223,9.80454545 1.22313223,11.3 C1.22313223,12.7954545 1.59213223,14.2363636 2.23131318,15.5090909 L5.84677686,13.2 L5.84677686,13.2 Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12,5.07272727 C13.4660793,5.07272727 14.7813132,5.54545455 15.8231132,6.52727273 L18.9177422,3.43636364 C17.4354793,2.07272727 14.9528207,1.2 12,1.2 C7.69061033,1.2 3.97371033,3.90454545 2.23131318,7.69090909 L5.84677686,10 C6.70901033,7.38727273 9.13131318,5.07272727 12,5.07272727 L12,5.07272727 Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div>
                <Link
                  to={"/"}
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10,0 C4.4771525,0 0,4.47593818 0,10 C0,14.4194126 2.86666667,18.1660079 6.83333333,19.4879328 C7.33333333,19.5807279 7.5,19.2763928 7.5,19.0055401 C7.5,18.7610745 7.5,18.1417426 7.5,17.3055401 C4.71666667,17.9138029 4.13333333,15.9666031 4.13333333,15.9666031 C3.68333333,14.8105483 3.025,14.5062132 3.025,14.5062132 C2.11666667,13.8979505 3.09166667,13.9143376 3.09166667,13.9143376 C4.10833333,13.9879328 4.64166667,14.9334826 4.64166667,14.9334826 C5.55,16.4572354 6.98333333,16.0164126 7.54166667,15.7619471 C7.63333333,15.1208143 7.89166667,14.6799916 8.175,14.4194126 C5.95833333,14.1588335 3.625,13.3062132 3.625,9.47593818 C3.625,8.38642344 4.01666667,7.49334826 4.65833333,6.79505483 C4.55,6.54087209 4.20833333,5.52188335 4.75833333,4.14642344 C4.75833333,4.14642344 5.59166667,3.87593818 7.5,5.16799916 C8.29166667,4.94642344 9.15,4.83563558 10,4.83563558 C10.85,4.83563558 11.7083333,4.94642344 12.5,5.16799916 C14.4083333,3.87593818 15.2416667,4.14642344 15.2416667,4.14642344 C15.7916667,5.52188335 15.45,6.54087209 15.3416667,6.79505483 C15.9833333,7.49334826 16.375,8.38642344 16.375,9.47593818 C16.375,13.3225998 14.0333333,14.1505483 11.8083333,14.4029255 C12.1583333,14.7236477 12.5,15.3484955 12.5,16.2908143 C12.5,17.6334826 12.5,18.6688335 12.5,19.0055401 C12.5,19.2763928 12.6583333,19.5889131 13.1666667,19.4879328 C17.1333333,18.1577228 20,14.4194126 20,10 C20,4.47593818 15.5228475,0 10,0 Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
