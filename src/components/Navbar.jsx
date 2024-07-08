import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-[#468585] text-white py-2'>
        <div className='logo'>
            <span className='font-bold text-xl hover:font-extralight text-[#DEF9C4] mx-8'>workManager</span>
        </div>
        <ul className='flex gap-12 mx-10'>
            <li className='font-semibold text-[#DEF9C4] hover:font-extrabold transition-all'>About</li>
            <li className='font-semibold text-[#DEF9C4] hover:font-extrabold transition-all'>Home</li>

        </ul>
    </nav>
  )
}

export default Navbar