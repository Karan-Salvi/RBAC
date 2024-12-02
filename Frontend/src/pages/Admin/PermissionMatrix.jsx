import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button } from "antd";
import AdminHeader from "./AdminHeader";
import RoleForm from "./RoleForm";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { rolesSliceActions } from "../../store/rolesSlice";
import { GrUpdate } from "react-icons/gr";
import UpdateRole from "./UpdateRole";
import UpdateUserRole from "./UpdateUserRole";

// Permission matrix for roles
const PermissionMatrix = () => {
  const [permissionsList, setPermissionsList] = useState([
    "Read",
    "Write",
    "Delete",
  ]);
  // const [rolesList, setRolesList] = useState([]);

  const rolesList = useSelector((store) => store.roles);

  const currentUser = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [deleteComponent, setDeleteComponent] = useState(false);

  const [updateComponent, setUpdateComponent] = useState(false);

  const [roleId, setRoleId] = useState();

  useEffect(() => {
    async function getRoles() {
      const responce = await fetch("http://localhost:8000/api/v1/roles", {
        credentials: "include",
      });

      const value = await responce.json();

      dispatch(rolesSliceActions.initializeRoles(value.data));
    }
    getRoles();
  }, []);

  const handleDeleteRole = async (id) => {
    const responce = await fetch(`http://localhost:8000/api/v1/roles/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const value = await responce.json();

    if (value.success) {
      dispatch(rolesSliceActions.deleteRole(id));
      toast.success("Role deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader />
      <div className="w-full flex items-center justify-between p-2">
        <div className="w-full">
          <h1 className="text-lg font-bold ">
            Roles There Assigned Permissions
          </h1>
        </div>
        <div className="w-full flex items-center justify-end p-2">
          <Link
            to={"/admin/dashboard/role/create"}
            className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-nowrap"
            type="submit"
          >
            Create New Role
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className=" w-full flex flex-col bg-gray-600 text-center rounded-lg overflow-hidden shadow-md">
          <div className="w-full grid grid-cols-6 bg-gray-100 p-5 border-2 overflow-hidden ">
            <h2 className="font-semibold text-sm md:text-base">Role</h2>
            {permissionsList.map((per) => (
              <h2 className="font-semibold text-sm md:text-base">{per}</h2>
            ))}
            <h2 className="font-semibold text-red-600 text-sm md:text-base">
              Delete Role
            </h2>
            <h2 className="font-semibold text-green-600 text-sm md:text-base">
              Update Permission
            </h2>
          </div>
          {rolesList.map((role) => (
            <div className="w-full grid grid-cols-6 items-center p-2 bg-white border-b-2">
              <h2 className="text-sm md:text-base">
                {role.name.toUpperCase()}
              </h2>
              {permissionsList.map((per) => (
                <h1
                  className={`rounded-md border-2 border-gray-500 w-5 h-5 mx-auto ${
                    role.permissions.includes(per) && " bg-blue-600"
                  } `}
                >
                  <IoMdCheckmark
                    className={`text-white font-bold text-base ${
                      role.permissions.includes(per) ? "block" : "hidden"
                    } `}
                  />
                </h1>
              ))}
              <button
                type="button"
                className={`w-auto ${
                  rolesList
                    .filter((role) => role.name == currentUser.role)[0]
                    .permissions.includes("Delete")
                    ? "flex"
                    : "hidden"
                }   items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg md:px-5 md:py-2.5 p-2  me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-base`}
                onClick={() => {
                  setDeleteComponent(true);
                  setRoleId(role._id);
                }}
                style={{ marginLeft: "10px" }}
              >
                <MdDelete className="text-2xl md:text-xl  text-white font-extrabold" />
                <span className="hidden lg:block">Remove</span>
              </button>
              <button
                type="button"
                className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                  rolesList
                    .filter((role) => role.name == currentUser.role)[0]
                    .permissions.includes("Write")
                    ? "flex"
                    : "hidden"
                }  items-center gap-1 justify-center`}
                onClick={() => {
                  setUpdateComponent(true);
                  setRoleId(role._id);
                }}
              >
                <GrUpdate className="text-xl md:text-sm  text-white font-extrabold" />
                <span className="hidden lg:block text-nowrap">
                  Update Permissions
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDelete
        deleteComponent={deleteComponent}
        setDeleteComponent={setDeleteComponent}
        handleOnDelete={handleDeleteRole}
        _id={roleId}
      />
      <UpdateRole
        updateComponent={updateComponent}
        setUpdateComponent={setUpdateComponent}
        _id={roleId}
      />
    </div>
  );
};

export default PermissionMatrix;
