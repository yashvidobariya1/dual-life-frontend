// src/Main/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.userInfo?.userInfo);
  const localToken = localStorage.getItem("token");

  const isAuthenticated = (reduxUser && reduxUser.token) || localToken;

  if (isAuthenticated) {
    // already logged in → go to dashboard (or any default page)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
