import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ConfirmDelete from "./ConfirmDelete";

const DeleteRole = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([""]); // Start with one empty permission

  const handlePermissionChange = (index, value) => {
    const newPermissions = [...permissions];
    newPermissions[index] = value;
    setPermissions(newPermissions);
  };

  const addPermission = () => {
    setPermissions([...permissions, ""]); // Add a new empty permission field
  };

  const removePermission = (index) => {
    const newPermissions = permissions.filter((_, i) => i !== index);
    setPermissions(newPermissions);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    permissions.forEach((permission) => {
      permission = permission.toUpperCase();
    });

    const responce = await fetch("http://localhost:8000/api/v1/roles/create", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: name.toLowerCase(),
        permissions: permissions,
      }),
    });

    const value = await responce.json();

    if (value.success) {
      toast.success("Role created successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-between items-center">
        <AdminHeader />
        <div className="w-full h-full flex  justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-2/5 border-2 px-6 py-16 rounded-lg shadow-xl "
          >
            <h1 className="text-lg font-bold">Delete Role :</h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Enter the Role which you want to delete
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Role Name"
                required
              />
            </div>

            <button
              type="button"
              className="w-auto  flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => removePermission(index)}
              style={{ marginLeft: "10px" }}
            >
              <MdDelete className="text-xl  text-white font-extrabold" />
              Delete User
            </button>
          </form>
        </div>

        <ConfirmDelete />
      </div>
    </>
  );
};

export default DeleteRole;
