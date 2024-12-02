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
import { CiLogout } from "react-icons/ci";
import AdminHeader from "./AdminHeader";

const AdminPanel = () => {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const responce = await fetch("http://localhost:8000/api/v1/logout", {
      method: "Get",
      credentials: "include",
    });

    const data = await responce.json();

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
    {
      id: 4,
      name: "Sign Out",
      icon: <CiLogout className="text-xl font-bold text-gray-700" />,
    },
    // {
    //   id: 4,
    //   name: "Role",
    //   icon: <IoMdSettings className="text-xl font-bold text-gray-700" />,
    //   URL: "/admin/dashboard/settings",
    // },
  ];

  const user = useSelector((store) => store.user);

  let date = new Date();

  return (
    <>
     
       
  

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <div className="flex items-center  p-5">
              <img
                src="/images/logo.jpg"
                alt="Profile Picture"
                className="rounded-xl w-7 h-7 mr-2"
              />
              <span className="text-xl font-bold poppins-bold">MentorFlux</span>
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
                  onClick={() => {
                    setActive(task.id);
                    if (task.id === 4) {
                      handleLogOut();
                    }
                  }}
                >
                  {task.icon}
                  {/* <IoIosHome className="text-xl font-bold text-gray-700" /> */}
                  <span className="ml-2 text-sm font-semibold text-gray-500">
                    {task.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div class="p-1 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default AdminPanel;
