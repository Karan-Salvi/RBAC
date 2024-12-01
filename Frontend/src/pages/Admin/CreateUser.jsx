import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import toast from "react-hot-toast";

const CreateUser = () => {
  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const emailElement = useRef();
  const roleElement = useRef();
  const passwordElement = useRef();

  const navigate = useNavigate();

  const handleRegisteration = async (event) => {
    event.preventDefault();

    let userRole = roleElement.current.value.toLowerCase();

    console.log("Take a mistake : ", userRole);

    const user = {
      name:
        firstNameElement.current.value + " " + lastNameElement.current.value,
      email: emailElement.current.value,
      password: passwordElement.current.value,
      role: userRole,
    };

    event.preventDefault();

    const responce = await fetch("http://localhost:8000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await responce.json();

    console.log("Our user data is : ", data);

    firstNameElement.current.value = "";
    lastNameElement.current.value = "";
    emailElement.current.value = "";
    passwordElement.current.value = "";
    roleElement.current.value = "";

    console.log("shinchan : ", data);

    if (data.success) {
      toast.success("User Created successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className=" font-sans flex flex-col justify-center w-full ">
      <div className="w-full flex flex-col min-h-screen items-center">
        <AdminHeader />

        <div className="w-full flex justify-center items-center h-full">
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-md h-auto lg:p-16 border-2 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Create a new User
            </h1>

            <form
              action="#"
              className="space-y-6"
              onSubmit={handleRegisteration}
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    ref={firstNameElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your First name here..."
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    ref={lastNameElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Last name here..."
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailElement}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Please Enter your Email here..."
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Role for user :
                </label>
                <input
                  type="text"
                  id="role"
                  ref={roleElement}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter role for user..."
                  required
                />
                {/* <select
                  id="role"
                  ref={roleElement}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>User</option>
                  <option>Admin</option>
                </select> */}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordElement}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Please enter password having at least 6 unique letters.. "
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
