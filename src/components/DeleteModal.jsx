import React from 'react'
import { FaCircleExclamation } from 'react-icons/fa6'

function DeleteModal() {
  return (
    <div className=' flex items-center w-full justify-center mt-12 flex-col'>
        <div className=' h-24 my-6 w-24 bg-red-500 shadow-lg shadow-red-500 justify-center flex items-center text-6xl rounded-full text-white'>
          !
        </div>
        <h1 className=' text-3xl font-bold'>Confirmation</h1>
        <p className=' text-sm mt-4'>Are you sure</p>
        <div className="px-4 mb-2 mt-6 w-full">
        <button className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full">
          Delete
        </button>
      </div>
        <div className="px-4 mt-1 w-full">
        <button className=" bg-white  rounded-sm text-xl h-16 border-[1px] border-gray-200 w-full">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteModal