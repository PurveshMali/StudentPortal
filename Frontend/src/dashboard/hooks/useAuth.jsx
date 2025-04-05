"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [educator, setEducator] = useState(null);
  const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

  // useEffect(() => {
  //   // Simulate authentication check
  //   const checkAuth = () => {
  //     setLoading(true);
  //     // In a real app, this would check a token in localStorage or cookies
  //     const mockUser = {
  //       id: 1,
  //       name: "Admin User",
  //       email: "admin@example.com",
  //       role: "admin",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //     };

  //     setTimeout(() => {
  //       setUser(mockUser);
  //       setLoading(false);
  //     }, 1000);
  //   };

  //   checkAuth();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true, // Ensure cookies are sent
        })
        setUser(data.user)
      } catch (error) {
        console.error("Authentication error:", error.response?.data || error.message)
        // setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])
  const login = (credentials) => {
    setLoading(true);
    // Mock login - would be an API call in a real app
    setTimeout(() => {
      setUser({
        id: 1,
        name: "Admin User",
        email: credentials.email,
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
      });
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
       // Redirect to login on logout
      localStorage.removeItem("token");
      alert("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
