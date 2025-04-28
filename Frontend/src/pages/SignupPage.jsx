"use client";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
        `http://localhost:5000/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        } // Important for handling cookies (if backend sets a token)
      );

      console.log("Signup successful:", response.data);
      alert("Signup successful!");
      // Or navigate to another page
      navigate("/login"); // Redirect to login page after successful signup
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });

      setErrors({});
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);

      // Set error message from backend if available
      setErrors({
        apiError: error.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link
            to={"/"}
            className="flex items-center text-purple-400 font-bold text-xl"
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
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Or{" "}
          <Link
            to={"/login"}
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1a1a1a] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-200"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`bg-[#2c2c2c] text-white appearance-none block w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-400" : "border-gray-600"
                  } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-200"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`bg-[#2c2c2c] text-white appearance-none block w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-400" : "border-gray-600"
                  } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-[#2c2c2c] text-white appearance-none block w-full px-3 py-2 border ${
                  errors.email ? "border-red-400" : "border-gray-600"
                } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-[#2c2c2c] text-white appearance-none block w-full px-3 py-2 border ${
                  errors.password ? "border-red-400" : "border-gray-600"
                } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-[#2c2c2c] text-white appearance-none block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-600"
                } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ${
                  errors.agreeToTerms ? "border-red-400" : ""
                }`}
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-500 mt-1">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a1a] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            {/* Add social login buttons here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
