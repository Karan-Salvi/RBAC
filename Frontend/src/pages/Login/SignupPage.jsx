import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const emailElement = useRef();

  const passwordElement = useRef();

  const navigate = useNavigate();

  const handleRegisteration = async (event) => {
    event.preventDefault();

    const user = {
      name:
        firstNameElement.current.value + " " + lastNameElement.current.value,
      email: emailElement.current.value,
      password: passwordElement.current.value,
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

    firstNameElement.current.value = "";
    lastNameElement.current.value = "";
    emailElement.current.value = "";
    passwordElement.current.value = "";
    roleElement.current.value = "";

    if (data.success == true) {
      navigate("/user/login");
    }
  };

  return (
    <section className="bg-gray-100 font-sans h-[91vh] flex flex-col justify-center md:p-5 ">
      <div className="container mx-auto p-4 mt-64 sm:mt-32 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-300 to-pink-200 overflow-hidden rounded-lg shadow-md  min-h-40 object-center md:hidden">
            <div className="flex flex-col items-center justify-center h-full relative">
              <img
                src="/images/background1.jpg"
                alt=""
                className="absolute order-3 w-full h-full"
              />
              <h1 className="text-6xl font-bold text-white mb-4 md:text-6xl lg:text-9xl relative ml-8">
                Welcome to MentorFlux!
              </h1>
              {/* <img src="./images/background.jpg" alt="" className="absolute order-3"/> */}
              {/* <img
              src="https://cdn.pixabay.com/photo/2017/02/21/15/19/arrow-2074591_960_720.png"
              alt="Arrow"
              className="w-16 h-16 text-white"
            /> */}
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md h-full lg:p-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Register Your account
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome to MentorFlux. Please register your new account.
            </p>
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
              {/*               
              <div className="w-full">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select your Role
                </label>
                <select
                  id="role"
                  ref={roleElement}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Student</option>
                  <option>Mentor</option>
                </select>
              </div> */}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember Me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                ></a>
              </div>
              <button
                type="submit"
                className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register your Account
              </button>
              <p className="text-gray-600 text-center mt-4">
                Already have an Account ?{" "}
                <Link
                  to={"/user/login"}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="bg-gradient-to-br from-purple-300 to-pink-200 overflow-hidden rounded-lg shadow-md  min-h-40 object-center hidden md:block">
            <div className="flex flex-col items-center justify-center h-full relative text-center">
              <img
                src="/images/background1.jpg"
                alt=""
                className="absolute order-3 w-full h-full"
              />
              <h1 className="text-5xl font-bold text-white mb-4 md:text-5xl lg:text-8xl relative ml-8 text-center">
                Welcome to MentorFlux!
              </h1>
              {/* <img src="./images/background.jpg" alt="" className="absolute order-3"/> */}
              {/* <img
              src="https://cdn.pixabay.com/photo/2017/02/21/15/19/arrow-2074591_960_720.png"
              alt="Arrow"
              className="w-16 h-16 text-white"
            /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
