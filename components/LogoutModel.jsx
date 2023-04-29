import { GlobalContext } from "@/context/GlobalContext";
import { dangerAlert, successAlert } from "@/utils/alert";
import { getDeleteBlogUrl } from "@/utils/urls";
import React, { useContext, useState } from "react";

const LogoutModel = (props) => {
  const { getAllBlog } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

  const logoutUser = () => {
   props.logoutUser();
   props.showAndHideDropdown();
   setShowModal(false);
  };

  return (
    <>
      <div
        class="w-auto h-auto cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div class="flex-1 h-full flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <h2 className="ml-2">Logout</h2>
        </div>
      </div>
      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-300/40">
          <div className="flex items-center justify-center pt-20 ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
              <h2 className="text-lg font-medium mb-4">Are you sure?</h2>
              <p className="text-gray-500 mb-4">{props.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => logoutUser()}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LogoutModel;
