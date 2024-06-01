import React, { useRef, useState } from "react";
import { CiCircleInfo, CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/slicers/auth";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";
import toast from "react-hot-toast";

function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loadingToastRef = useRef(null);

  function uploadImageHandler(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loadingToastRef.current = toast.loading("Updating Information");
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    if (file) formData.append("profileImage", file);
    apiRequest
      .put("/profile/information", formData)
      .then((res) => {
        dispatch(fetchUser());
        setError("");
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setSuccess("");
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loadingToastRef.current);
      });
  };
  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>
      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-start  px-4 md:shadow-none shadow-sm">
        <Link to="/profile">
          <h1 className=" text-xl font-[600] ">&lt; Information</h1>
        </Link>
      </div>
      <form className=" flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
        {image ? (
          <div className="mt-4 text-center mx-4">
            <h1 className=" font-[600]">Change Profile Image</h1>
          </div>
        ) : (
          <div className="mt-4  mx-4">
            <h1 className=" font-[600]">Change Profile Image</h1>
          </div>
        )}

        {image ? (
          <div className=" justify-center flex items-center flex-col my-2">
            <img
              src={image}
              alt="profile"
              className="w-[200px] h-[200px] object-cover"
            />
            <div className=" flex items-center justify-center">
              <label
                htmlFor="dp"
                className="  bg-color_dark_pink rounded-sm p-2 text-sm w-fit text-white cursor-pointer my-2"
              >
                Update Image
              </label>
            </div>
            <input
              type="file"
              accept=".jpg,.png"
              id="dp"
              className="hidden"
              name="image"
              onChange={uploadImageHandler}
            />
          </div>
        ) : (
          user && (
            <div className=" justify-center flex items-center flex-col my-2">
              <img
                src={user.profileImage}
                alt="profile"
                className="w-[200px] h-[200px] object-cover"
              />
              <div className=" flex items-center justify-center">
                <label
                  htmlFor="dp"
                  className="  bg-color_dark_pink rounded-sm p-2 text-sm w-fit text-white cursor-pointer my-2"
                >
                  Update Image
                </label>
              </div>
              <input
                type="file"
                accept=".jpg,.png"
                id="dp"
                className="hidden"
                name="image"
                onChange={uploadImageHandler}
              />
            </div>
          )
        )}

        <div className="mt-4 mx-4 ">
          <h1 className=" font-[600]">First Name</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="John"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <CiCircleInfo className=" flex-[1]  text-2xl" />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Last Name</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="Doe"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <CiCircleInfo className=" flex-[1]  text-2xl" />
        </div>

        {error ? (
          <span className="mx-4 text-xs text-color_dark_pink">{error}</span>
        ) : (
          <span className="mx-4 text-xs text-green-500">{success}</span>
        )}

        <div className="px-4 md:mt-12 mt-12 mb-6 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-lg font-bold h-16 shadow-lg shadow-color_dark_pink w-full"
          >
            {loading ? (
              <i className="fa text-white text-lg fa-spinner fa-spin"></i>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>

      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default UserInfo;
