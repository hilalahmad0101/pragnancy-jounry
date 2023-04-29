import DeleteModel from "@/components/DeleteModel";
import { GlobalContext } from "@/context/GlobalContext";
import { dangerAlert, successAlert } from "@/utils/alert";
import { getDeleteBlogCategoryUrl, getDeleteBlogUrl } from "@/utils/urls";
import Link from "next/link";
import React, { useContext, useState } from "react";

const Blog = () => {
  const { bloodPressure } = useContext(GlobalContext);
  console.log(bloodPressure)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   
  return (
    <div className="w-[90%] mx-auto py-10 ">
      <div className="shadow-md py-4 px-2 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">
            {/* Blogs ( {bloodPressure.blogs && bloodPressure.blogs.count.toString()} ) */}
          </h1>
          <Link href={`/admin/blog/create-blog`}>
            <button
              type="button"
              class="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-pink-400 dark:hover:bg-pink-400 focus:outline-none dark:focus:ring-pink-500"
            >
              Add New
            </button>
          </Link>
        </div>
      </div>
      <div className="py-10">
        <div class="relative   overflow-x-auto border mb-5">
          <table class="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Created At
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {blogs.blogs && blogs.blogs.rows.length == 0 ? (
                <h1 className="text-center text-xl font-bold p-4">
                  Record not found
                </h1>
              ) : (
                blogs.blogs &&
                blogs.blogs.rows.map((val) => {
                  const dateObj = new Date(val.created_at);

                  const day = dateObj.getDate();
                  const month = dateObj.getMonth() + 1; // Note: month starts from 0
                  const year = dateObj.getFullYear();
                  const hours = dateObj.getHours();
                  const minutes = dateObj.getMinutes();

                  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                  return (
                    <tr class="bg-white border-b  dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {val.id}
                      </th>
                      <td class="px-6 py-4">{val.title}</td>
                      <td
                        class="px-6 py-4"
                        dangerouslySetInnerHTML={{
                          __html: val.html_description,
                        }}
                      ></td>
                      <td class="px-6 py-4">{formattedDate}</td>
                      <td class="px-6 py-4">
                        <div className="flex items-center">
                          <div class="w-auto h-auto cursor-pointer ">
                            <div class="flex-1 h-full">
                              <Link
                                href={`/admin/blog/update-blog/${val.id}`}
                              >
                                <div class="flex items-center justify-center flex-1 h-full p-2 bg-green-800 text-white shadow rounded-full">
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
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <DeleteModel
                            message="Are you sure you want to delete this model"
                            id={val.id}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blog;
