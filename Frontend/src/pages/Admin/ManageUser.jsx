import React, { useEffect, useState } from "react";
import AdminNote from "./AdminNote";
import Info from "./Info";
import { FaSearch } from "react-icons/fa";
import AdminHeader from "./AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { usersSliceActions } from "../../store/usersSlice";

const ManageUser = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  let users = useSelector((store) => store.users);

  let URI = "http://localhost:8000/api/v1/users";
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(URI, { credentials: "include" });
        const finaldata = await response.json();

        if (Array.isArray(finaldata.data)) {
          dispatch(usersSliceActions.initializeUsers(finaldata.data));
        } else {
          console.error("Invalid data format:", finaldata);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [URI]);

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow  md:p-4  overflow-hidden">
        <div className="flex flex-col justify-center w-full border-none">
          <AdminHeader query={query} setQuery={setQuery} />
          <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg relative gap-1 border-2">
            <div className="flex items-center justify-center">
              <div>
                <p className="text-gray-900 font-semibold">Name</p>
                <p className="text-gray-500">Date of Joined</p>
              </div>
            </div>
            <span className={`px-2 rounded-md font-semibold`}>Email</span>
            <span className={`font-semibold px-16`}>Roll</span>
            <div className="flex items-center">
              <p className="text-gray-500 mr-3 font-semibold">Last Activity</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 min-h-[79vh] max-h-[79vh] overflow-y-scroll scrollbar-none scrollbar-hide px-2">
          {users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.createdAt.toLowerCase().includes(query) ||
                user.updatedAt.toLowerCase().includes(query)
            )
            .map((user) => (
              <Info key={user.id} user={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ManageUser;
