import React from 'react'
import NavbarRoutes from './navbar-routes'

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
        {/* <MobileSideBar/> */}
      <NavbarRoutes/>
    </div>
  )
}

export default Navbar
