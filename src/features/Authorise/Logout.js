import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRegisteredUser, signOutAsync } from "./authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectRegisteredUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>

}

export default Logout;
