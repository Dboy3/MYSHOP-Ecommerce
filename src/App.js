import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import CartPage from "./pages/CartPage/CartPage";
import Checkout from "./pages/CheckoutPage/Checkout";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from "./features/Authorise/Protected";
import { getItemsByUserId } from "./features/ShoppingCart/cartSlice";
import { selectRegisteredUser } from "./features/Authorise/authSlice";
import PageNotFound from "./pages/404/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import UserOrderPage from "./pages/UserDetailPage/UserOrderPage";
import UserProfilePage from "./pages/UserDetailPage/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/User/userSlice";
import Logout from "./features/Authorise/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    // for testing
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    // for testing
    path: "/details/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "/myOrders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/myProfile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
]);

function App() {

  const user = useSelector(selectRegisteredUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getItemsByUserId(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
