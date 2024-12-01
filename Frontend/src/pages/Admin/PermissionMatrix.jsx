// import React, { useState } from "react";
// import { Table, Checkbox, Button } from "antd";
// import AdminHeader from "./AdminHeader";

// const permissionsList = ["Read", "Write", "Delete"];
// const rolesList = [
//   { id: 1, name: "Admin" },
//   { id: 2, name: "Editor" },
//   { id: 3, name: "Viewer" },
// ];

// const PermissionMatrix = () => {
//   const [rolePermissions, setRolePermissions] = useState({
//     Admin: { Read: true, Write: true, Delete: true },
//     Editor: { Read: true, Write: true, Delete: false },
//     Viewer: { Read: true, Write: false, Delete: false },
//   });

//   const handlePermissionChange = (role, permission) => {
//     setRolePermissions((prev) => ({
//       ...prev,
//       [role]: {
//         ...prev[role],
//         [permission]: !prev[role][permission],
//       },
//     }));
//   };

//   const saveChanges = () => {
//     console.log("Updated Role Permissions:", rolePermissions);
//     // Make API call to save the changes
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <AdminHeader />
//       <div className="w-full flex flex-col justify-center items-center">
//         <Table
//           className="w-full"
//           bordered
//           dataSource={rolesList.map((role) => ({
//             key: role.id,
//             role: role.name,
//             ...permissionsList.reduce(
//               (acc, perm) => ({
//                 ...acc,
//                 [perm]: (
//                   <Checkbox
//                     checked={rolePermissions[role.name]?.[perm] || false}
//                     onChange={() => handlePermissionChange(role.name, perm)}
//                   />
//                 ),
//               }),
//               {}
//             ),
//           }))}
//           columns={[
//             { title: "Role", dataIndex: "role", key: "role" },
//             ...permissionsList.map((perm) => ({
//               title: perm,
//               dataIndex: perm,
//               key: perm,
//             })),
//           ]}
//           pagination={false}
//         />
//         <Button
//           type="primary"
//           onClick={saveChanges}
//           style={{ marginTop: "20px" }}
//         >
//           Save Changes
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PermissionMatrix;

import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button } from "antd";
import AdminHeader from "./AdminHeader";
import RoleForm from "./RoleForm";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";

// Permission matrix for roles
const PermissionMatrix = () => {
  const [permissionsList, setPermissionsList] = useState([
    "Read",
    "Write",
    "Delete",
  ]);
  const [rolesList, setRolesList] = useState([]);

  const [deleteComponent, setDeleteComponent] = useState(false);

  const [roleId, setRoleId] = useState();

  useEffect(() => {
    async function getRoles() {
      const responce = await fetch("http://localhost:8000/api/v1/roles");

      const value = await responce.json();

      console.log("All permisssions are : ", value);

      setRolesList(value.data);
    }
    getRoles();
  }, []);

  const [rolePermissions, setRolePermissions] = useState({
    Admin: { Read: true, Write: true, Delete: true },
    Editor: { Read: true, Write: true, Delete: false },
    User: { Read: true, Write: false, Delete: false },
  });

  // Handle permission change for a role
  const handlePermissionChange = (role, permission) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission],
      },
    }));
  };

  // Save changes function (console log here, can be connected to API)
  const saveChanges = () => {
    console.log("Updated Role Permissions:", rolePermissions);
    // Make API call to save the changes
  };

  const handleDeleteRole = async (id) => {
    const responce = await fetch(`http://localhost:8000/api/v1/roles/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const value = await responce.json();
    console.log("Value after deleting role is : ", value);
    if (value.success) {
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
        {/* <Table
          className="w-full"
          bordered
          dataSource={rolesList.map((role) => ({
            key: role.id,
            role: role.name,
            ...permissionsList.reduce(
              (acc, perm) => ({
                ...acc,
                [perm]: (
                  <h1
                    className={`rounded-md border-2 border-gray-500 ${
                      rolePermissions[role.name]?.[perm] && " bg-blue-600"
                    } w-5 h-5 inline-fle`}
                  >
                    <IoMdCheckmark className="text-white font-bold text-base" />
                  </h1>
                  // <Checkbox
                  //   readOnly
                  //   checked={rolePermissions[role.name]?.[perm] || false}
                  //   onChange={() => handlePermissionChange(role.name, perm)}
                  // />
                ),
              }),
              {}
            ),
          }))}
          columns={[
            { title: "Role", dataIndex: "role", key: "role" },
            ...permissionsList.map((perm) => ({
              title: perm,
              dataIndex: perm,
              key: perm,
            })),
          ]}
          pagination={false}
        /> */}

        <div className=" w-full flex flex-col bg-gray-600 text-center rounded-lg overflow-hidden shadow-md">
          <div className="w-full grid grid-cols-5 bg-gray-100 p-5 border-2 overflow-hidden ">
            <h2 className="font-semibold">Role</h2>
            {permissionsList.map((per) => (
              <h2 className="font-semibold">{per}</h2>
            ))}
            <h2 className="font-semibold text-red-600">Delete Role</h2>
          </div>
          {rolesList.map((role) => (
            <div className="w-full grid grid-cols-5 items-center p-2 bg-white border-b-2">
              <h2>{role.name.toUpperCase()}</h2>
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
                className="w-auto  flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-base"
                onClick={() => {
                  setDeleteComponent(true);
                  setRoleId(role._id);
                }}
                style={{ marginLeft: "10px" }}
              >
                <MdDelete className="text-xl  text-white font-extrabold" />
                Remove
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
    </div>
  );
};

export default PermissionMatrix;
