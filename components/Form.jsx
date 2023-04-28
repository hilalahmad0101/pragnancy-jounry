import Link from 'next/link'
import React from 'react'

const Form = () => {
  return (
    
    <div className="container max-w-3xl mx-auto my-10">
    <div className="shadow-md bg-white rounded-md px-[49px] py-[30px]">
      <h1 className="font-semibold text-3xl text-center">Category</h1>
      <div className="my-4">
        <label htmlFor="" className="text-[20px] font-medium">
          Category Name
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
          Category Description
        </label>
        <textarea 
        rows={10}
        name=""
          placeholder="Enter Username"
          className="w-full bg-gray-100 border border-gray-100 rounded-[7px] py-3 px-4 outline-none text-md font-normal mt-3"></textarea>
      </div>

   
      <div className="my-3">
        <Link href={`/admin/category`}><button className="w-full py-3 text-center bg-pink-400 text-white rounded-[8px]">
          Create
        </button></Link>
      </div>
    </div>
  </div>

  )
}

export default Form