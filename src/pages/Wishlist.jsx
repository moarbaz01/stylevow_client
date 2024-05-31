import React from 'react'
import Products from '../components/Products'

function Wishlist() {
  return (
    <div className='px-16 py-4'>
        <h1 className=' text-xl my-4'>YOUR WISHLIST</h1>
        <Products limit={4}/>
    </div>
  )
}

export default Wishlist