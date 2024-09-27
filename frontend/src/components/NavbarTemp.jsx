import React from 'react'
import MedibriefLogo from '../assets/newLogo.jpg'

const NavbarTemp = () => {
  return (
    <nav className="bg-white shadow-sm">
    <div className="container mx-auto flex justify-between items-center py-4">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          M
        </div>
        <span className="ml-3 font-bold text-xl text-gray-800">Medibrief</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-gray-500">
        <a href="#" className="font-medium text-gray-800 hover:text-blue-500">Home</a>
        <a href="#scroll-services" className="hover:text-blue-500">Services</a>
        <a href="#scroll-about" className="hover:text-blue-500">About</a>
        <a href="#jsl-link-button" className="hover:text-blue-500">Inspiration</a>
      </div>
    </div>
  </nav>
  )
}

export default NavbarTemp