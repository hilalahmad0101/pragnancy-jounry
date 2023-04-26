import { Inter } from "next/font/google";
import Link from 'next/link';
export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="container max-w-md">
        <div className="shadow-md bg-white rounded-md px-[49px] py-[30px]">
          <h1 className="font-semibold text-3xl text-center">Login</h1>
          <div className="my-4">
            <label htmlFor="" className="text-[20px] font-medium">
              Username
            </label>
            <input
              type="text"
              name=""
              placeholder="Enter Username"
              className="w-full bg-gray-100 border border-gray-100 rounded-[7px] py-3 px-4 outline-none text-md font-normal mt-3"
            />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-[20px] font-medium">
              Password
            </label>
            <input
              type="text"
              name=""
              placeholder="Enter Password"
              className="w-full bg-gray-100 border border-gray-100 rounded-[7px] py-3 px-4 outline-none text-md font-normal mt-3"
            />
          </div>
          <div className="my-3">
            <Link href={`/admin/dashboard`}><button className="w-full py-3 text-center bg-pink-400 text-white rounded-[8px]">
              Login
            </button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
