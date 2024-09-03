import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";
import { isLogin } from "../../auth";

function Guestlayout() {
  const { user } = useContext(AuthContext);

  // If the user is logged in, navigate to the home page
  if (isLogin()) {
    return <Navigate to="/admin" replace  = {true}/>;
  }

  // Otherwise, render the nested routes
  return <Outlet />;
}

export default Guestlayout;
