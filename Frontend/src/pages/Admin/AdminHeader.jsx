import React, { useState } from "react";
import { FaLiraSign, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHeader = ({ query, setQuery }) => {
  const [search, setSearch] = useState(false);
  return (
    <div className="w-full h-16 flex justify-between items-center p-4 border-b-2 mb-4">
      <h2 className=" text-xl font-bold">Dashboard</h2>
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
