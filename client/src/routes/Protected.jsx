import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protected = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default Protected;
