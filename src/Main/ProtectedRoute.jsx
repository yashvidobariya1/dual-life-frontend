import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.userInfo?.userInfo);
  const localToken = localStorage.getItem("token");

  // Check redux first, fallback to localStorage
  const isAuthenticated = (reduxUser && reduxUser.token) || localToken;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
