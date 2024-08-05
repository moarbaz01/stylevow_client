import { useLocation } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./redux/slicers/auth";
import { getUserCart } from "./redux/slicers/cart";
import Router from "./routes/Router";
import MyToaster from "./components/MyToaster";
import { checkServer } from "./redux/slicers/loading";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("stylevow_token");
  const location = useLocation();
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      dispatch(getUserCart());
    } else {
      localStorage.removeItem("stylevow_token");
    }
  }, [token]);

  useEffect(() => {
    dispatch(checkServer());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center h-screen overflow-hidden">
        <span className="loader"></span>
        <p className="mt-6">Please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <MyToaster />
      {![
        "/gender",
        "/profile",
        "/changeEmail",
        "/phone",
        "/changePassword",
        "/information",
        "/address",
        "/payment",
        "/cards",
        "/addCard",
        "/address/add",
        "/order",
        "/orderConfirm",
        "/success",
        "/login",
        "/signup",
        "/reviews",
        "/review",
        "/forgotpassword",
        "/resetPassword",
      ].some((path) => location.pathname.includes(path)) && <BottomNavbar />}

      <Router />
    </div>
  );
}

export default App;
