import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const currentUser = useSelector((store) => store.user);

  const location = useLocation();

  if (currentUser.role === "unloggeduser") {
    console.error("Unauthorized access attempt:", currentUser);
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default UserRoute;
