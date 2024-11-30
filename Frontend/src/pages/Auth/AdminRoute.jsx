import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const currentUser = useSelector((store) => store.user);

  console.log("Current User is:", currentUser);
  const location = useLocation();

  if (currentUser.role !== "admin") {
    console.error("Unauthorized access attempt by:", currentUser);
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
