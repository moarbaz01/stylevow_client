import React from 'react'

function Announcement() {
  return (
    <div className='block'>
        <div className=' bg-color_dark_pink text-white hidden md:flex items-center py-1 text-sm justify-center'>
        Free Shipping Worldwide | Cash on Delivery | Easy Exchange & Return
        </div>
        <div className=' bg-color_dark_pink text-white flex items-center md:hidden h-10 font-[600] py-1 text-sm justify-center'>
        Free Shipping Worldwide !
        </div>
    </div>
  )
}

export default Announcement