import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { MdHistory } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";

import { FaSearch } from "react-icons/fa";

import { FaCalendarAlt } from "react-icons/fa";
import AdminNote from "./AdminNote";
import AdminDashboard from "./AdminDashboard";
import CreateUser from "./CreateUser";
import ConfirmDelete from "./ConfirmDelete";
import { Toaster } from "react-hot-toast";
const AdminPanel = () => {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const responce = await fetch("http://localhost:8000/api/v1/logout", {
      method: "Get",
      credentials: "include",
    });

    const data = await responce.json();

    console.log("User Logged out data is : ", data);

    if (data.success == true) {
      navigate("/user/login");
    }
  };

  const tasklist = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FaHome className="text-xl font-bold text-gray-700" />,
      URL: "/admin/dashboard",
    },

    {
      id: 2,
      name: "Manage Users",
      icon: (
        <MdOutlineSupportAgent className="text-xl font-bold text-gray-700" />
      ),
      URL: "/admin/dashboard/manageusers",
    },
    {
      id: 3,
      name: "Settings",
      icon: <IoMdSettings className="text-xl font-bold text-gray-700" />,
      URL: "/admin/dashboard/settings",
    },
    // {
    //   id: 4,
    //   name: "Role",
    //   icon: <IoMdSettings className="text-xl font-bold text-gray-700" />,
    //   URL: "/admin/dashboard/settings",
    // },
  ];

  const user = useSelector((store) => store.user);

  console.log("Hiiisisisi", user.role);

  let date = new Date();

  console.log("So date will be : " + date.toDateString().substring(4));
  return (
    <>
      {" "}
      <div className="w-full relative flex flex-col">
        <div className="flex flex-row  max-h-[100vh] min-h-[100vh]">
          <div className="w-1.5/12 md:w-2/12 bg-white rounded-lg shadow p-2 flex flex-col justify-between">
            <ul className="list-none">
              <div className=" md:flex items-center  p-5">
                <img
                  src="/images/logo.jpg"
                  alt="Profile Picture"
                  className="rounded-xl w-7 h-7 mr-2"
                />
                <span className="text-xl font-bold poppins-bold">
                  MentorFlux
                </span>
              </div>

              {tasklist.map((task) => (
                <li
                  className={`p-3 border-b border-gray-200 ${
                    active === task.id ? "bg-gray-200" : ""
                  } hover:bg-gray-200 rounded-lg`}
                >
                  <Link
                    to={`${task.URL}`}
                    className="flex items-center"
                    onClick={() => setActive(task.id)}
                  >
                    {task.icon}
                    {/* <IoIosHome className="text-xl font-bold text-gray-700" /> */}
                    <span className="ml-2 text-sm font-semibold text-gray-500 hidden sm:block">
                      {task.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 md:flex items-center p-3 flex justify-between">
              <div className="flex items-center">
                {" "}
                <img
                  src={`${user.avatar}`}
                  alt="Profile Picture"
                  className="rounded-full w-10 h-10 mr-2"
                />
                <span className="text-lg font-medium">{user.name}</span>
              </div>

              <PiDotsThreeBold className="text-xl" />
            </div>
          </div>

          <Outlet />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default AdminPanel;
