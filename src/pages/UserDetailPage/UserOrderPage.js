import React from "react";
import Navbar from "../../features/Navbar/Navbar";
import UserOrders from "../../features/User/Componentes/UserOrders";
function UserOrderPage() {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
}

export default UserOrderPage;
