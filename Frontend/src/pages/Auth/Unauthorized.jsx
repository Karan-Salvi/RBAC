import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDangerous } from "react-icons/md";

const Unauthorized = () => {
  return (
    <div className="min-h-[90vh] bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <MdOutlineDangerous className="text-9xl text-red-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Sorry, you don't have permission to access this page. Please check
          your credentials or contact the administrator for assistance.
        </p>
        <div className="mt-8">
          <Link
            to={"/"}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
