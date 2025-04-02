"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        if (data.user) {
          setIsAuthenticated(true);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        navigate("/login"); // Redirect on error (unauthorized)
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Verifying...
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
