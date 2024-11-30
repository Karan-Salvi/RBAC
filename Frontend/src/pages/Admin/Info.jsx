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

const Info = ({ user }) => {
  const [deleteComponent, setDeleteComponent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleOnDelete = async (id) => {
    try {
      console.log("Delete confirmed");
      const url = `http://localhost:8000/api/v1/user/delete`;
      const responce = await fetch(`${url}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const value = await responce.json();

      console.log("Value after deleting user is : ", value);

      if (value.success === true) {
        dispatch(
          messageActions.setMessage({ success: true, message: value.message })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  let timeStringToDayName = (dateStr) => {
    // for getting day name by time string
    // const dateStr = "2024-09-26T04:31:50.646+00:00";
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    console.log(dayName);
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
    console.log(istDate); // Output: "September 26, 2024, 10:01:50 AM"
    return istDate;
  };

  const { _id, createdAt, email, role, name } = user;

  const realTimeString = timeStringtoRealTime(createdAt);

  console.log("real time string is : ", realTimeString);

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg gap-1">
        <div className="flex items-center">
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
        <span className={`px-2 rounded-md font-semibold font-mono`}>
          {user.email}
        </span>
        <span className={`bg-gray-300 px-2 rounded-md`}>
          {role.toUpperCase()}
        </span>
        <div className="flex items-center gap-3">
          <p className="text-gray-500 mr-3">
            {realTimeString.substring(0, 18)}
          </p>
          <MdDelete
            className="text-red-600 text-2xl"
            onClick={() => {
              setDeleteComponent(true);
            }}
          />
          <RxAvatar className="text-gray-600 text-2xl font-extrabold" />
        </div>
      </div>

      <ConfirmDelete
        deleteComponent={deleteComponent}
        setDeleteComponent={setDeleteComponent}
        setDeleteConfirm={setDeleteConfirm}
        handleOnDelete={handleOnDelete}
        _id={_id}
      />
    </>
  );
};

export default Info;
