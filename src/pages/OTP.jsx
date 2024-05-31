import React from 'react'
import Announcement from '../components/Announcement'
import { IoShieldCheckmark } from "react-icons/io5"

function OTP() {
  return (
    <div>
        {/* <Announcement /> */}
        <div className='max-w-[1080px] md:h-screen mx-auto'>
            <div className='flex items-center flex-col mt-[100px] md:bg-gray-100 md:h-[60%] md:w-[60%] w-[90%] mx-auto rounded-lg justify-center'>
                <div><IoShieldCheckmark fontSize="4rem" color='#FF92A5' className='my-1'/></div>
                <div className='my-4'>ONE TIME PASSWORD</div>
                <form action="">
                    <input className='h-12 w-12 border-[1px] mx-2 text-center text-2xl border-black ' type="text" maxLength="1" oninput={function () {this.value=this.value.replace(/[^0-9]/g,'')}} />
                    <input className='h-12 w-12 border-[1px] mx-2 text-center text-2xl border-black ' type="text" maxLength="1" oninput={function () {this.value=this.value.replace(/[^0-9]/g,'')}}/>
                    <input className='h-12 w-12 border-[1px] mx-2 text-center text-2xl border-black ' type="text" maxLength="1" oninput={function () {this.value=this.value.replace(/[^0-9]/g,'')}} />
                    <input className='h-12 w-12 border-[1px] mx-2 text-center text-2xl border-black ' type="text" maxLength="1" oninput={function () {this.value=this.value.replace(/[^0-9]/g,'')}} />
                    <div className='text-center my-4'>
                        <input type="submit" className='py-2 w-[60%] rounded-sm cursor-pointer text-white hover:bg-color_pink transition bg-color_dark_pink' value="Verify OTP"  />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default OTP