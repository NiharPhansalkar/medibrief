import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-300 to-blue-500 py-10 relative">
      <div className="container mx-auto flex flex-col items-center text-white text-center px-6">
  {/* Logo and Description */}
  <div className="flex flex-col items-center">
    <div className="flex items-center mb-4">
      <div className="bg-white text-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold">
        M
      </div>
      <span className="font-bold text-xl ml-3">Medibrief</span>
    </div>
    <p className="text-sm">
      Medibrief provides progressive, and affordable healthcare, accessible on mobile and online for everyone.
    </p>
    <p className="mt-6 text-xs">©Medibrief 2024. All rights reserved</p>
  </div>
</div>

    </footer>
  )
}

export default Footer