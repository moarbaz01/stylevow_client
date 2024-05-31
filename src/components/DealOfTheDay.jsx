import React from 'react'
import { dealOfTheDay } from '../data'
import { IoMdStar } from "react-icons/io";

function DealOfTheDay() {
    
    return (
        <div className='flex items-center flex-col md:flex-row py-8 md:px-6 px-2 border-[1px] md:w-full md:mx-0 w-[90%] mx-auto border-gray-200  md:h-[60vh]'>
            <div className='md:flex-1 flex items-center justify-center'>
                <img className='h-[90%] w-[90%]' src={dealOfTheDay.url} alt="" />
            </div>
            <div className='flex items-start md:flex-1 flex-col px-4 w-full  gap-4'>
                <div className='flex items-center gap-2'>
                    <IoMdStar  className='text-yellow-400 stroke-black stroke-2'/>
                    <IoMdStar  className='text-yellow-400 stroke-black stroke-2'/>
                    <IoMdStar  className='text-yellow-400 stroke-black stroke-2'/>
                    <IoMdStar  className='text-yellow-400 stroke-black stroke-2'/>
                    <IoMdStar className='text-yellow-400 stroke-black stroke-2' />
                </div>
                <div className='flex gap-2 flex-col md:h-full w-[90%]'>
                    <span className='font-bold text-ellipsis overflow-hidden whitespace-nowrap w-[90%]'>{dealOfTheDay.name.toUpperCase()}</span>
                    <p className=' opacity-50 text-[14px]  '>{dealOfTheDay.desc}</p>
                    <div className='flex items-center gap-4 my-2'>
                        <span className=' text-color_dark_pink tracking-wide font-bold text-2xl'>₹{dealOfTheDay.price}</span>
                        <span className=' text-2xl line-through tracking-wide text-gray-400'>₹{dealOfTheDay.cutPrice}</span>
                    </div>
                    <button className=' bg-color_dark_pink hover:bg-color_pink transition rounded-sm font-[500] p-2 w-[40%] text-sm md:w-[30%] text-white md:p-2'>ADD TO CART</button>
                </div>
                <div className='flex flex-col w-full '>
                    <div className='flex items-center w-[80%] md:w-full justify-between my-2'>
                        <span className='text-sm'>Already sold : <b>{dealOfTheDay.sold}</b></span>
                        <span className='text-sm'>Available : <b>{dealOfTheDay.available}</b></span>
                    </div>
                    <div className=' bg-gray-100 h-2 w-full rounded-2xl flex items-center justify-start'>
                        <div className=' bg-color_dark_pink h-[50%] rounded-2xl w-[30%] '></div>
                    </div>
                    <div className='flex items-start flex-col gap-2 mt-4 '>
                        <span className='text-[12px] font-[400]'>HURRY UP! OFFER ENDS IN:</span>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col items-center justify-center bg-gray-100 p-2 rounded-md'>
                                <span className='font-bold'>25</span>
                                <span className='text-sm'>Days</span>
                            </div>
                            <div className='flex flex-col items-center justify-center bg-gray-100 p-2 rounded-md'>
                                <span className='font-bold'>{dealOfTheDay.date.getHours()}</span>
                                <span className='text-sm'>Hours</span>
                            </div>
                            <div className='flex flex-col items-center justify-center bg-gray-100 p-2 rounded-md'>
                                <span className='font-bold'>{dealOfTheDay.date.getMinutes()}</span>
                                <span className='text-sm'>Minutes</span>
                            </div>
                            <div className='flex flex-col items-center justify-center bg-gray-100 p-2 rounded-md'>
                                <span className='font-bold'>{dealOfTheDay.date.getSeconds()}</span>
                                <span className='text-sm'>Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DealOfTheDay