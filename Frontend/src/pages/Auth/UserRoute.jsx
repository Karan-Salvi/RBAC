import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const currentUser = useSelector((store) => store.user);

  console.log("Current User is : ", currentUser);
  const location = useLocation();

  // Check if user exists and role is valid
  if (!["admin", "user"].includes(currentUser.role)) {
    console.error("Unauthorized access attempt:", currentUser);
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  // Render children if authorized
  return <>{children}</>;
};

export default UserRoute;
