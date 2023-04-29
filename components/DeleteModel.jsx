import { GlobalContext } from "@/context/GlobalContext";
import { dangerAlert, successAlert } from "@/utils/alert";
import { getDeleteBlogUrl } from "@/utils/urls";
import React, { useContext, useState } from "react";

const DeleteModel = (props) => {
    const { getAllBlog } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
  };

  const deleteBlog = async (id) => {
    const res = await (
      await fetch(`${getDeleteBlogUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
    ).json();
    if (res.error) {
      dangerAlert(res.message);
    } else {
      successAlert(res.message);
      getAllBlog();
      handleDelete();
    }
  };
  return (
    <>
      <div
        class="w-auto h-auto cursor-pointer   ml-4"
        onClick={() => setShowModal(true)}
      >
        <div class="flex-1 h-full ">
          <div class="flex items-center justify-center flex-1 h-full p-2 bg-red-800 text-white shadow rounded-full">
            <div class="relative">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
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
                  onClick={()=>deleteBlog(props.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteModel;
