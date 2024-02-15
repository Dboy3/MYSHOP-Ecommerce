import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectRegisteredUser } from "./authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(selectRegisteredUser);
  if (!user) {
    // Navigate is use to redirect to another page
    return <Navigate to="/login"></Navigate>;
  }
  return children;
}

export default Protected;
