// frontend/src/components/RoleForm.js
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const RoleForm = ({ fetchRoles }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    permissions.forEach((permission) => {
      permission = permission.toUpperCase();
    });

    

    // await fetch("http://localhost:8000/api/v1/roles", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     name: name.toLowerCase(),
    //     permissions: permissions,
    //   }),
    // });
    // fetchRoles();
    // setName("");
    // setPermissions([""]); // Reset to one empty permission
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Enter the Role Name : </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Role Name"
          required
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="permissions">Assign Permissions : </label>
        {permissions.map((permission, index) => (
          <div key={index} className="flex items-center">
            {/* <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={permission}
              onChange={(e) => handlePermissionChange(index, e.target.value)}
              placeholder={`Permission ${index + 1}`}
              required
            /> */}

            <select
              id="role"
              value={permission}
              onChange={(e) => handlePermissionChange(index, e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Select Permissions</option>
              <option>Read</option>
              <option>Write</option>
              <option>Delete</option>
            </select>

            <button
              type="button"
              className="w-auto  flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => removePermission(index)}
              style={{ marginLeft: "10px" }}
            >
              <MdDelete className="text-xl  text-white font-extrabold" />
              Remove
            </button>
          </div>
        ))}
        <div className="w-full flex justify-center items-center">
          <button
            className=" w-2/6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center gap-2 justify-center"
            type="button"
            onClick={addPermission}
            style={{ marginTop: "10px" }}
          >
            <FaPlus className="text-lg font-extrabold" /> Add Permission
          </button>
        </div>
      </div>

      <button
        className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
        style={{ marginTop: "10px" }}
      >
        Add Role
      </button>
    </form>
  );
};

export default RoleForm;
