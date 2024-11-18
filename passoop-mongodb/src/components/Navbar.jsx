import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-700 flex inset-1 justify-between items-center px-4 h-12'>
        <div className='logo font-bold'>
          <span className='text-black'>&lt;</span>
           <span className='text-white text-lg shadow-lg shadow-purple'>PassOP</span>
          <span className='text-black'>/ &gt;</span>
                
          </div>
     
      <button className='flex  items-center bg-white rounded-xl gap-2 ring-black ring-2'>
        <img className='w-9 p-1' src="icons/github.svg" alt="" />
        <span className='font-bold p-1'><a href="https://github.com/">Github</a></span>
      </button>
    </nav>
  )
}

export default Navbar
