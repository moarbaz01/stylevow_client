import { useLocation } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser, logoutSuccess } from "./redux/slicers/auth";
import { getUserCart } from "./redux/slicers/cart";
import Router from "./routes/Router";
import MyToaster from "./components/MyToaster";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("stylevow_token");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      dispatch(getUserCart());
    } else {
      localStorage.removeItem("stylevow_token");
    }
  }, []);

  return (
    <div>
      <MyToaster/>
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
