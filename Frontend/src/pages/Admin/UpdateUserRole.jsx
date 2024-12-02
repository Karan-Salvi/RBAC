import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rolesSliceActions } from "../../store/rolesSlice";
import toast from "react-hot-toast";

const UpdateUserRole = ({ updateComponent, setUpdateComponent, id }) => {
  const nameElement = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getRoles() {
      const responce = await fetch("http://localhost:8000/api/v1/roles",{credentials: "include",});

      const value = await responce.json();



      dispatch(rolesSliceActions.initializeRoles(value.data));
    }
    getRoles();
  }, []);

  const handleRole = async (e) => {
    e.preventDefault();
   
    try {
      const responce = await fetch(
        `http://localhost:8000/api/v1/user/updateRoleAsAdmin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role: nameElement.current.value.toLowerCase(),
          }),
        }
      );

      const value = await responce.json();
      

      if (value.success) {
        setUpdateComponent(false);
        toast.success("Role Updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rolesList = useSelector((store) => store.roles);
  return (
    <>
      {updateComponent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-full h-auto flex  justify-center items-center ">
            <form
              onSubmit={handleRole}
              className="flex flex-col gap-4 w-2/5 h-auto border-2 px-6 py-16 rounded-lg  bg-white "
            >
              <h1 className="text-lg font-bold">Update Users Role : </h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter the Role to assign :</label>

                <select
                  id="name"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={nameElement}
                >
                  <option>Select Role to update</option>
                  {rolesList.map((role) => (
                    <option key={role._id}>{role.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <button
                className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-nowrap"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Add Role
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserRole;
