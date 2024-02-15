import React from "react";
import Navbar from "../../features/Navbar/Navbar";
import Profile from "../../features/User/Componentes/Profile";

function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <Profile></Profile>
      </Navbar>
    </div>
  );
}

export default UserProfilePage;
