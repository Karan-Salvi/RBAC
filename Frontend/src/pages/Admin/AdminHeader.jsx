import React, { useState } from "react";
import { FaLiraSign, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHeader = ({ query, setQuery }) => {
  const [search, setSearch] = useState(false);
  return (
    <div className="w-full h-16 flex justify-between items-center p-4 border-b-2 mb-4">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2  text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <h2 className=" text-xl font-bold flex justify-center items-center">Dashboard</h2>
      <div className="flex items-center justify-between w- gap-3">
        <form className="flex items-center w-full gap-2">
          <input
            type="search"
            id="search"
            className={`${
              search ? "block" : "hidden"
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Search..."
            required
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <FaSearch
            className="text-xl"
            onClick={() => {
              setSearch(!search);
            }}
          />
        </form>

        <Link
          to={"/admin/dashboard/create-user"}
          type="button"
          className="text-white   bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 text-nowrap"
        >
          Create User
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
