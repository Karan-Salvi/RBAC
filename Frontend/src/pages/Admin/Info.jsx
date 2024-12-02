import React, { useState } from "react";
import {
  MdDelete,
  MdSecurityUpdate,
  MdSystemUpdate,
  MdUpdate,
} from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { messageActions } from "../../store/messageSlice";
import toast from "react-hot-toast";
import UpdateUserRole from "./UpdateUserRole";

const Info = ({ user }) => {
  const [deleteComponent, setDeleteComponent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [updateComponent, setUpdateComponent] = useState(false);
  const dispatch = useDispatch();

  const handleOnDelete = async (id) => {
    try {
      const url = `http://localhost:8000/api/v1/user/delete`;
      const responce = await fetch(`${url}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const value = await responce.json();

      if (value.success) {
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  let timeStringToDayName = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    return dayName;
  };

  const [update, setUpdate] = useState(false);

  let timeStringtoRealTime = (utcDateStr) => {
    // for converting the to get time in am or pm
    //const utcDateStr = "2024-09-26T04:31:50.646+00:00";
    const date = new Date(utcDateStr);
    // India TimeZone is Asia/Kolkata, which is UTC+5:30
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const istDate = date.toLocaleString("en-US", options);
    // Output: "September 26, 2024, 10:01:50 AM"
    return istDate;
  };

  const { _id, createdAt, email, role, name } = user;

  const realTimeString = timeStringtoRealTime(createdAt);

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg gap-2">
        <div className="flex flex-col md:flex-row text-nowrap items-start gap-1 ">
          <img
            src={`${user.avatar}`}
            alt="Profile picture of the user who followed you"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-900">{name}</p>
            <p className="text-gray-500">
              {timeStringToDayName(createdAt)},
              {realTimeString.substring(21, 26) +
                " " +
                realTimeString.substring(30)}
            </p>
          </div>
        </div>

        <span
          className={`px-1 hidden md:block md:px-2 text-base rounded-md font-semibold font-mono `}
        >
          {user.email}
        </span>
        <span
          className={`block md:hidden px-1 md:px-2 text-sm rounded-md font-semibold font-mono `}
        >
          {user.email.substring(0, 5)}..
        </span>
        <span className={`bg-gray-300 px-2 py-1 rounded-md text-xs`}>
          {role.toUpperCase()}
        </span>
        <div className="flex items-center p-4 md:gap-2">
          <p className="text-gray-500 text-sm ">
            {realTimeString.substring(0, 18)}
          </p>
          <div className=" flex flex-col md:flex-row gap-2">
            <MdDelete
              className="text-red-600 text-2xl"
              onClick={() => {
                setDeleteComponent(true);
              }}
            />
            <RxAvatar
              className="text-gray-600 text-2xl font-extrabold"
              onClick={() => {
                setUpdateComponent(true);
              }}
            />
          </div>
        </div>
      </div>

      <ConfirmDelete
        deleteComponent={deleteComponent}
        setDeleteComponent={setDeleteComponent}
        setDeleteConfirm={setDeleteConfirm}
        handleOnDelete={handleOnDelete}
        _id={_id}
      />

      <UpdateUserRole
        updateComponent={updateComponent}
        setUpdateComponent={setUpdateComponent}
        id={_id}
      />
    </>
  );
};

export default Info;
