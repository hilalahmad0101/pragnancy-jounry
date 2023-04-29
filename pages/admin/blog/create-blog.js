import { GlobalContext } from "@/context/GlobalContext";
import { dangerAlert, successAlert } from "@/utils/alert";
import { getCreateBlogCategoryUrl, getCreateBlogUrl } from "@/utils/urls";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const { getAllBlog } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [blog, setBlog] = useState({
    title: "",
    html_description: "",
    user_id:localStorage.getItem('token')
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value; 
    setBlog({ ...blog, [name]: value });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { title, html_description } = blog;
    if (title && html_description) {
      const res = await (
        await fetch(getCreateBlogUrl, {
          method: "POST",
          body: JSON.stringify(blog),
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        })
      ).json();
      if (res.error) {
        dangerAlert(res.message);
        setLoading(false);
      } else {
        successAlert("Category Add Successfully");
        router.push("/admin/blog");
        getAllBlog();
        setLoading(false);
      }
    } else {
      dangerAlert("Please fill all the field");
      setLoading(false);
    }
  };
  return (
    <div className="w-[90%] mx-auto py-10 ">
      <div className="shadow-md py-4 px-2 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">
            {" "}
            <Link href={`/admin/blog`} className="underline">
              Blog
            </Link>{" "}
            / Add New
          </h1>
        </div>
      </div>
      <div>
        <div className="container max-w-3xl mx-auto my-10">
          <form
            onSubmit={onSubmitHandle}
            className="shadow-md bg-white rounded-md px-[49px] py-[30px]"
          >
            <h1 className="font-semibold text-3xl text-center">Blog</h1>
            <div className="my-4">
              <label htmlFor="" className="text-[20px] font-medium">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                onChange={onChangeHandle}
                placeholder="Enter Blog Name"
                className="w-full bg-gray-100 border border-gray-100 rounded-[7px] py-3 px-4 outline-none text-md font-normal mt-3"
              />
            </div>

            <div className="my-4">
              <label htmlFor="" className="text-[20px] font-medium">
                Blog Description
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                // name="description"
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {
                  setBlog({ html_description: newContent });
                }}
              />
            </div>

            <div className="my-3">
              <button
                type="submit"
                className="w-full py-3 text-center bg-pink-400 text-white rounded-[8px]"
              >
                {loading ? (
                  <div
                    role="status "
                    className="flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
