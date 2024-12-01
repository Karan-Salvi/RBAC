import React, { useEffect } from "react";
import Notification from "../../components/Notification";
import Info from "./Info.jsx";
import { PiDotsThreeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { usersSliceActions } from "../../store/usersSlice.js";

const AdminNote = ({ query }) => {
  function filterRecentUsers(users, days = 7) {
    const currentDate = new Date();
    const thresholdDate = new Date(currentDate);
    thresholdDate.setDate(currentDate.getDate() - days);

    return users.filter((user) => new Date(user.createdAt) >= thresholdDate);
  }

  let users = useSelector((store) => store.users);

  console.log("Users are : ", users);

  let dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      
      try {
        const response = await fetch("http://localhost:8000/api/v1/users");
        const finaldata = await response.json();

        console.log("Khich meri photo", finaldata);

        console.log("Khich meri photo", finaldata.toString());

        // Validate if finaldata.data exists and is an array
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
  }, [users, users.length]);

  // for getting day name by time string
  // const dateStr = '2024-09-26T04:31:50.646+00:00';
  // const date = new Date(dateStr);
  // const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  // console.log(dayName); // Output: "Thursday"

  // for converting the to get time in am or pm
  // const utcDateStr = '2024-09-26T04:31:50.646+00:00';
  // const date = new Date(utcDateStr);
  // India TimeZone is Asia/Kolkata, which is UTC+5:30
  // const options = {
  //     timeZone: 'Asia/Kolkata',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //     hour12: true,
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // };

  // const istDate = date.toLocaleString('en-US', options);
  // console.log(istDate); // Output: "September 26, 2024, 10:01:50 AM"

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow p-4 ">
        <div className="flex flex-col justify-center w-full">
          <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg relative gap-1 border-b-2">
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
        <div className="flex flex-col w-full gap-2 max-h-[45vh] overflow-y-scroll scrollbar-none scrollbar-hide">
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

export default AdminNote;
