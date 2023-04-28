import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { GlobalContext } from "@/context/GlobalContext";
import { dangerAlert, successAlert } from "@/utils/alert";
import { getDeleteBlogCategoryUrl } from "@/utils/urls";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Category = () => {
  const { categories, getAllCategory } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    return (
      categories.blogCategories &&
      categories.blogCategories.rows.filter((item) =>
        item.name.toLowerCase().includes(item.name.toLowerCase())
      )
    );
  };

  const deleteCategory = async (id) => {
    const res = await (
      await fetch(`${getDeleteBlogCategoryUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
    ).json();
    if (res.error) {
      dangerAlert("Server Problem");
    } else {
      successAlert("Delete Successfully");
      getAllCategory();
    }
  };
  return (
    <div className="w-[90%] mx-auto py-10 ">
      <div className="shadow-md py-4 px-2 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">
            Category ({" "}
            {categories.blogCategories &&
              categories.blogCategories.count.toString()}{" "}
            )
          </h1>
          <Link href={`/admin/category/create-category`}>
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
        {/* <label
            for="default-search"
            class="mb-2 text-sm font-medium text-pink-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-white dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-pink-400 border border-pink-300 rounded-lg bg-pink-50 focus:ring-pink-500 focus:border-pink-500 dark:bg-pink-400 dark:border-pink-400 dark:placeholder-white dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 outline-none"
              placeholder="Search Here"
              required
            />
            <button
              onClick={handleSearch}
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-600 dark:focus:ring-pink-800"
            >
              Search
            </button>
          </div> */}
        <div class="relative   overflow-x-auto border mb-5">
          <table class="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Category Name
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
              {categories.blogCategories &&
              categories.blogCategories.rows.length == 0 ? (
                <h1 className="text-center text-xl font-bold p-4">
                  Record not found
                </h1>
              ) : (
                categories.blogCategories &&
                categories.blogCategories.rows.map((val) => {
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
                      <td class="px-6 py-4">{val.name}</td>
                      <td class="px-6 py-4">{val.description}</td>
                      <td class="px-6 py-4">{formattedDate}</td>
                      <td class="px-6 py-4">
                        <div className="flex items-center">
                          <div class="w-auto h-auto cursor-pointer ">
                            <div class="flex-1 h-full">
                              <Link
                                href={`/admin/category/update-category/${val.id}`}
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
                          <div
                            class="w-auto h-auto cursor-pointer   ml-4"
                            onClick={() => deleteCategory(val.id)}
                          >
                            <div class="flex-1 h-full">
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
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* <nav aria-label="Page navigation example ">
            <ul class="flex items-center justify-end -space-x-px">
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav> */}
      </div>
    </div>
  );
};

export default Category;
