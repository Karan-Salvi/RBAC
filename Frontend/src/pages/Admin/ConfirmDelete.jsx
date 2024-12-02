import React from "react";
import { MdOutlineDangerous } from "react-icons/md";

const ConfirmDelete = ({
  deleteComponent,
  setDeleteComponent,
  setDeleteConfirm,
  handleOnDelete,
  _id,
}) => {
  
  return (
    <>
      {deleteComponent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="text-red-500 font-bold text-lg">
                <MdOutlineDangerous className="text-8xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 w-full text-center">
              Delete
            </h3>
            <p className="text-gray-600 text-sm">
              Are you sure you want to delete this ? This action cannot be
              undone.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                onClick={() => setDeleteComponent(false)}
                aria-label="Cancel deletion"
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  // setDeleteConfirm(true);
                  handleOnDelete(_id);
                  setDeleteComponent(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDelete;
