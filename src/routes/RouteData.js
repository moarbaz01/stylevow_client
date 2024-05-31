import { lazy } from "react";
const routes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/Login")),
  },
  {
    path: "/signup",
    component: lazy(() => import("../pages/Signup")),
  },
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
  },
  {
    path: "/success",
    component: lazy(() => import("../pages/Success")),
    protected: true,
  },
  {
    path: "/profile",
    component: lazy(() => import("../pages/PhoneProfile")),
    protected: true,
  },
  {
    path: "/product/:id",
    component: lazy(() => import("../pages/Product")),
  },
  {
    path: "/cart",
    component: lazy(() => import("../pages/Cart")),
    protected: true,
  },
  {
    path: "/categories",
    component: lazy(() => import("../pages/Categories")),
  },
  {
    path: "/account",
    component: lazy(() => import("../pages/Account")),
    // protected: true,
  },
  {
    path: "/cards",
    component: lazy(() => import("../pages/Cards")),
    protected: true,
  },
  {
    path: "/phone",
    component: lazy(() => import("../pages/Phone")),
    protected: true,
  },
  {
    path: "/reviews/:id",
    component: lazy(() => import("../pages/Reviews")),
  },
  {
    path: "/review/:id",
    component: lazy(() => import("../pages/WriteReview")),
    protected: true,
  },
  {
    path: "/information",
    component: lazy(() => import("../pages/UserInfo")),
    protected: true,
  },
  {
    path: "/explore",
    component: lazy(() => import("../pages/Search")),
  },
  {
    path: "/offer",
    component: lazy(() => import("../pages/Offer")),
  },
  {
    path: "/address/add",
    component: lazy(() => import("../pages/Address")),
    protected: true,
  },
  {
    path: "/address",
    component: lazy(() => import("../pages/AddressAdd")),
    protected: true,
  },
  {
    path: "/forgotPassword",
    component: lazy(() => import("../pages/ForgotPassword"))
  },
  {
    path: "/resetPassword",
    component: lazy(() => import("../pages/ResetPassword"))
  },

  {
    path: "/payment",
    component: lazy(() => import("../pages/Payment")),
    protected: true,
  },
  {
    path: "/addCard",
    component: lazy(() => import("../pages/AddCard")),
    protected: true,
  },
  {
    path: "/feature",
    component: lazy(() => import("../pages/FeatureProduct")),
  },
  {
    path: "/order",
    component: lazy(() => import("../pages/Order")),
    protected: true,
  },
  {
    path: "/order/:id",
    component: lazy(() => import("../pages/OrderDetails")),
    protected: true,
  },
  {
    path: "/changeEmail",
    component: lazy(() => import("../pages/ChangeMail")),
    protected: true,
  },
  {
    path: "/changePassword",
    component: lazy(() => import("../pages/ChangePassword")),
    protected: true,
  },
  {
    path: "/orderConfirm",
    component: lazy(() => import("../pages/OrderConfirm")),
    protected: true,
  },
  {
    path: "/gender",
    component: lazy(() => import("../pages/Gender")),
  },
  {
    path: "/otp",
    component: lazy(() => import("../pages/OTP")),
  },
  {
    path: "/products/search/:q",
    component: lazy(() => import("../pages/ProductSearch")),
  },
];

export default routes;
