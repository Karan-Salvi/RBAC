import React, { useState } from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import AdminNote from "./AdminNote";
import { useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import CreateUser from "./CreateUser";

const AdminDashboard = () => {
  function filterRecentUsers(users, days = 7) {
    const currentDate = new Date();
    const thresholdDate = new Date(currentDate);
    thresholdDate.setDate(currentDate.getDate() - days);

    return users.filter((user) => new Date(user.createdAt) >= thresholdDate);
  }
  let date = new Date();

  const [query, setQuery] = useState("");

  const user = useSelector((store) => store.user);

  const users = useSelector((store) => store.users);

  let usersRecent = filterRecentUsers(users);

  return (
    <>
      <div className="flex flex-col w-full ">
        <AdminHeader query={query} setQuery={setQuery} />

        <div className="w-full flex items-center justify-between p-3 mb-4">
          <div className="w-full">
            <h1 className="font-extrabold text-4xl font-sans">
              Hello, {user.role.toUpperCase() || "ADMIN"}
            </h1>
            <p className="text-gray-500 text-sm">Cheakout out latest updates</p>
          </div>
          <div className="">
            <button className="px-3 py-2 rounded-lg font-semibold border-gray-300 border-2 inline-flex items-center gap-2 text-nowrap w-auto">
              <FaCalendarAlt />

              {date.toDateString().substring(4, 8)}
              {date.toDateString().substring(11)}
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center md:flex-row gap-3 mb-3 md:p-3">
          <div className="w-full h-auto max-w-sm">
            <div className=" bg-purple-600 text-white rounded-lg shadow-lg p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <h1 className="font-bold text-2xl">{users.length}</h1>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{users.length}%</span>
                </div>
                <div className="w-full bg-purple-300 rounded-full h-2.5">
                  <div
                    className="bg-white h-2.5 rounded-full"
                    style={{ width: `${users.length % 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <span>{date.toDateString().substring(4)}</span>
                <div className="flex -space-x-2">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 1"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 2"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 3"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 4"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto max-w-sm">
            <div className=" bg-blue-500 text-white rounded-lg shadow-lg p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">New Users</h2>
                <h1 className="font-bold text-2xl">{usersRecent.length}</h1>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{usersRecent.length}%</span>
                </div>
                <div className="w-full bg-blue-300 rounded-full h-2.5">
                  <div
                    className="bg-white h-2.5 rounded-full"
                    style={{ width: `${usersRecent.length % 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <span>{date.toDateString().substring(4)}</span>
                <div className="flex -space-x-2">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 1"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 2"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 3"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 4"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <AdminNote query={query} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
