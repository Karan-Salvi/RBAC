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

import React, { useState } from "react";
import { Table, Checkbox, Button } from "antd";
import AdminHeader from "./AdminHeader";
import RoleForm from "./RoleForm";

// Define permissions and roles
const permissionsList = ["Read", "Write", "Delete"];
const rolesList = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Editor" },
  { id: 3, name: "User" }, // Updated to User instead of Viewer
];

// Permission matrix for roles
const PermissionMatrix = () => {
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

  return (
    <div className="container mx-auto p-4">
      <AdminHeader />
      <div className="w-full flex flex-col justify-center items-center">
        <Table
          className="w-full"
          bordered
          dataSource={rolesList.map((role) => ({
            key: role.id,
            role: role.name,
            ...permissionsList.reduce(
              (acc, perm) => ({
                ...acc,
                [perm]: (
                  <Checkbox
                    checked={rolePermissions[role.name]?.[perm] || false}
                    onChange={() => handlePermissionChange(role.name, perm)}
                  />
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
        />
        <Button
          type="primary"
          onClick={saveChanges}
          style={{ marginTop: "20px" }}
          className="text-black"
        >
          Save Changes
        </Button>
      </div>

      <RoleForm />
    </div>
  );
};

export default PermissionMatrix;
