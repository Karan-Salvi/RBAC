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
        {/* <div className="w-full h-16 flex justify-between items-center p-1 border-b-2 mb-4">
        <h2 className=" text-xl font-bold">Dashboard</h2>
        <div className="flex items-center justify-between w-auto gap-3">
          <FaSearch />
          <button
            type="button"
            className="text-white   bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Create User
          </button>
        </div>
      </div> */}
        <div className="w-full flex items-center justify-between p-2 mb-4">
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
        <div className="w-full flex gap-3 mb-3">
          <div className="w-full h-auto max-w-sm">
            <div class=" bg-purple-600 text-white rounded-lg shadow-lg p-4">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold">Total Users</h2>
                <h1 className="font-bold text-2xl">{users.length}</h1>
              </div>
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{users.length}%</span>
                </div>
                <div class="w-full bg-purple-300 rounded-full h-2.5">
                  <div
                    class="bg-white h-2.5 rounded-full"
                    style={{ width: `${users.length % 100}%` }}
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4 text-sm">
                <span>{date.toDateString().substring(4)}</span>
                <div class="flex -space-x-2">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 1"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 2"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 3"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 4"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto max-w-sm">
            <div class=" bg-blue-500 text-white rounded-lg shadow-lg p-4">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold">New Users</h2>
                <h1 className="font-bold text-2xl">{usersRecent.length}</h1>
              </div>
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{usersRecent.length}%</span>
                </div>
                <div class="w-full bg-blue-300 rounded-full h-2.5">
                  <div
                    class="bg-white h-2.5 rounded-full"
                    style={{ width: `${usersRecent.length % 100}%` }}
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4 text-sm">
                <span>{date.toDateString().substring(4)}</span>
                <div class="flex -space-x-2">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 1"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 2"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 3"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
                    src="/images/logo.jpg"
                    alt="User 4"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-blue-500"
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
